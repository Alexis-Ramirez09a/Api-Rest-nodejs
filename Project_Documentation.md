# Documentación Técnica del Proyecto: API RESTful con Node.js y Seguridad Avanzada (JWT)

## 1. Introducción

El presente documento tiene como finalidad describir en detalle el desarrollo, arquitectura y funcionamiento de una **API RESTful** construida sobre el entorno de ejecución **Node.js**. Este proyecto nace de la necesidad de crear un sistema backend robusto, escalable y seguro para la gestión de un inventario de productos y categorías.

En el desarrollo de software moderno, las APIs (Application Programming Interfaces) son fundamentales para permitir la comunicación entre diferentes sistemas (Frontend, Aplicaciones Móviles, Terceros). Este proyecto se centra no solo en la funcionalidad básica (CRUD), sino en la implementación de estándares de la industria para la **seguridad** y la **documentación**.

Puntos clave del proyecto:
*   **Gestión de Datos**: Operaciones de Crear, Leer, Actualizar y Eliminar (CRUD) sobre entidades relacionales.
*   **Seguridad Ofensiva/Defensiva**: Implementación de autenticación mediante tokens y hashing de contraseñas.
*   **Documentación Viva**: Integración de Swagger para pruebas en tiempo real.

## 2. Arquitectura y Estructura del Proyecto

### 2.1 Patrón de Diseño
El proyecto sigue el patrón de arquitectura **MVC (Modelo-Vista-Controlador)**, adaptado para servicios REST. En este contexto:
*   **Modelo (Models)**: Representa la estructura de los datos y la lógica de negocio directa con la base de datos. Se utiliza **Sequelize** como ORM (Object-Relational Mapping) para abstraer las consultas SQL y trabajar con objetos JavaScript.
*   **Controlador (Controllers)**: Maneja la lógica de la petición. Recibe los datos del usuario, invoca al modelo y decide qué respuesta enviar.
*   **Vista (Views)**: En una API REST, la "vista" es la representación JSON de los datos que se envía al cliente.

### 2.2 Tecnologías y Herramientas
*   **Node.js**: Entorno de ejecución de JavaScript del lado del servidor, elegido por su modelo de E/S no bloqueante, ideal para APIs de alto rendimiento.
*   **Express.js**: Framework minimalista para Node.js que facilita el manejo de rutas y middlewares.
*   **MySQL**: Sistema de gestión de bases de datos relacional.
*   **Sequelize**: ORM que facilita la interacción con MySQL, manejo de migraciones y validaciones.
*   **JWT (JSON Web Tokens)**: Estándar para la transmisión segura de información entre partes.
*   **Bcryptjs**: Librería para el hashing (encriptado unidireccional) de contraseñas.

### 2.3 Estructura de Directorios
La organización del código es modular para facilitar el mantenimiento:

*   **`src/config/`**: Contiene la configuración de la conexión a la base de datos y variables de entorno.
*   **`src/models/`**: Define los esquemas de las tablas (`Usuario`, `Producto`, `Categoria`). Aquí se configuran los tipos de datos y las relaciones (ej. Una Categoría tiene muchos Productos).
*   **`src/controllers/`**: Contiene las funciones que resuelven las peticiones (ej. `auth.controller.js` contiene la lógica de registro y login).
*   **`src/routes/`**: Define los endpoints URL (ej. `/api/productos`) y asigna qué controlador y qué middlewares se ejecutan en cada ruta.
*   **`src/middleware/`**: Capas intermedias de seguridad. Aquí residen `auth.middleware.js` (verifica token) y `role.middleware.js` (verifica permisos de administrador).
*   **`src/app.js`**: Punto de entrada. Configura Express, CORS, Swagger y levanta el servidor.

## 3. Seguridad y Autenticación (JWT)

La seguridad es el pilar central de este proyecto. A diferencia de las aplicaciones web tradicionales que usan sesiones y cookies (Stateful), esta API es **Stateless** (sin estado). Esto significa que el servidor no guarda información de la sesión del usuario en memoria; cada petición debe autenticarse por sí misma.

### 3.1 Estrategia de Tokens (Access & Refresh)
Para lograr una autenticación segura y eficiente, implementamos una estrategia de doble token:

#### A. Access Token (Token de Acceso)
*   **Función**: Es la "llave" que abre las puertas de la API. El cliente debe enviarlo en cada petición a rutas protegidas.
*   **Ubicación**: Se envía en el Header HTTP `Authorization` con el prefijo `Bearer`.
    *   *Ejemplo*: `Authorization: Bearer eyJhbGciOiJIUz...`
*   **Tiempo de Vida**: Corto (**1 hora**). Esto minimiza el riesgo si el token es robado.
*   **Contenido (Payload)**: Contiene información no sensible del usuario (ID, Email, Nombre) y, crucialmente, su **Rol**.

#### B. Refresh Token (Token de Refresco)
*   **Función**: Permite obtener un nuevo Access Token cuando el anterior expira, sin obligar al usuario a loguearse de nuevo.
*   **Tiempo de Vida**: Largo (**7 días**).
*   **Seguridad**: Se almacena en la base de datos. Esto permite al administrador "revocar" el acceso de un usuario simplemente borrando o invalidando su Refresh Token en la base de datos, forzándolo a loguearse nuevamente.

### 3.2 Protección de Contraseñas
Las contraseñas **NUNCA** se guardan en texto plano. Utilizamos **Bcryptjs** para realizar un "hashing" con "salt".
*   **Registro**: Al recibir la contraseña, se le aplica el algoritmo de hash (10 rondas). El resultado (un string ininteligible) es lo que se guarda en la BD.
*   **Login**: Al intentar entrar, se compara el hash de la contraseña ingresada con el hash guardado. Como es unidireccional, ni siquiera el administrador puede saber la contraseña real del usuario.

### 3.3 Control de Acceso Basado en Roles (RBAC)
No basta con saber *quién* es el usuario (Autenticación), también debemos controlar *qué* puede hacer (Autorización).
*   **Rol 'user'**: Puede consultar listados de productos y categorías.
*   **Rol 'admin'**: Tiene privilegios elevados. Puede crear, modificar y eliminar recursos.
*   **Middleware `isAdmin`**: Este componente intercepta las peticiones a rutas críticas. Verifica si el `rol` dentro del token es `'admin'`. Si no lo es, rechaza la petición con un error `403 Forbidden`.

## 4. Documentación con Swagger (OpenAPI)

La documentación no es un añadido, es parte del producto. Hemos integrado **Swagger UI**, que genera una página web interactiva basada en la especificación OpenAPI.

### Beneficios
1.  **Estandarización**: Sigue normas internacionales para describir APIs.
2.  **Interactividad**: Permite a los desarrolladores (Frontend o Mobile) probar los endpoints directamente desde el navegador sin escribir código.
3.  **Sincronización**: Gracias a `swagger-autogen`, la documentación se actualiza automáticamente al detectar nuevas rutas en el código, evitando que la documentación quede obsoleta.

### Uso de la Interfaz
*   Acceso: `http://localhost:3000/api-docs`
*   **Botón Authorize**: Es fundamental para probar la seguridad. Permite ingresar el token JWT una sola vez, y Swagger se encarga de inyectarlo en el header de todas las peticiones subsiguientes.

> **[ESPACIO PARA IMAGEN: Captura panorámica de Swagger UI mostrando los grupos de endpoints (Auth, Productos, Categorias)]**

## 5. Endpoints de Autenticación

Detalle técnico de los endpoints encargados de la gestión de identidad.

### 5.1 Registro (`POST /api/auth/register`)
Crea una nueva cuenta. Valida que el email no exista previamente.
*   **Request Body**:
    ```json
    {
      "nombre": "Administrador Sistema",
      "email": "admin@empresa.com",
      "password": "PasswordSeguro123!",
      "rol": "admin"
    }
    ```
*   **Respuestas**:
    *   `201 Created`: Usuario creado correctamente.
    *   `400 Bad Request`: El email ya está registrado o faltan datos.

### 5.2 Login (`POST /api/auth/login`)
Verifica credenciales y emite los tokens.
*   **Request Body**:
    ```json
    {
      "email": "admin@empresa.com",
      "password": "PasswordSeguro123!"
    }
    ```
*   **Respuestas**:
    *   `200 OK`: Credenciales válidas. Retorna objeto con `token` y `refreshToken`.
    *   `400 Bad Request`: Usuario no encontrado o contraseña incorrecta.

## 6. Evidencias y Pruebas de Funcionamiento

A continuación se presenta la evidencia gráfica del ciclo completo de uso y seguridad.

### 6.1 Creación de Usuario Administrador (Postman)
Se utiliza Postman para la creación inicial del usuario, demostrando la capacidad de la API para recibir JSON y procesar la creación en base de datos.

> **[ESPACIO PARA IMAGEN: Captura de Postman. Resaltar: Método POST, URL /register, Body con rol 'admin' y Código de estado 201]**

### 6.2 Proceso de Login y Obtención de Token (Swagger)
Demostración del login exitoso. El servidor responde con el Token JWT cifrado.

> **[ESPACIO PARA IMAGEN: Captura de Swagger. Resaltar: Response Body con el string largo del "token"]**

### 6.3 Autorización en Swagger
Configuración de la sesión en la documentación para simular un usuario autenticado.

> **[ESPACIO PARA IMAGEN: Captura del modal "Authorize". Mostrar cómo se pega el token con el prefijo "Bearer "]**

### 6.4 Prueba de Acceso Protegido (Crear Categoría)
Validación final. Un usuario con rol de administrador intenta crear un recurso protegido. El servidor valida el token, confirma el rol y permite la operación.

> **[ESPACIO PARA IMAGEN: Captura de la respuesta 201 al crear una categoría. Esto prueba que el middleware de Auth y el de Rol funcionaron correctamente]**

## 7. Conclusión

El desarrollo de este proyecto ha permitido consolidar conocimientos avanzados en el desarrollo Backend con Node.js. Se ha logrado construir una API que no solo cumple con los requisitos funcionales de gestión de inventario, sino que implementa capas de seguridad profesionales (JWT, Hashing, RBAC) necesarias en cualquier entorno productivo.

La inclusión de documentación automática con Swagger eleva la calidad del entregable, facilitando su consumo por terceros y asegurando la mantenibilidad a largo plazo. La arquitectura modular y el uso de un ORM como Sequelize garantizan que el proyecto sea escalable y fácil de extender con nuevas funcionalidades en el futuro.
