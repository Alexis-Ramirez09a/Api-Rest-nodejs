# API REST con Node.js, Express y MySQL

API REST desarrollada con Node.js y Express, utilizando MySQL como base de datos y Sequelize como ORM. Esta API permite gestionar productos con operaciones CRUD (Crear, Leer, Actualizar, Eliminar) y autenticación de usuarios mediante JWT.

## Tecnologías Utilizadas

- Node.js
- Express.js
- MySQL
- Sequelize (ORM)
- JWT (JSON Web Tokens) para autenticación
- bcryptjs para encriptación
- dotenv para variables de entorno
- nodemon para desarrollo

## Prerrequisitos

- Node.js (versión recomendada: 16.x o superior)
- MySQL instalado y corriendo
- Git (para clonar el repositorio)

## Instalación

1. Clonar el repositorio:
```bash
git clone https://github.com/Alexis-Ramirez09a/Api-Rest-nodejs.git
cd Api-Rest-nodejs
```

2. Instalar dependencias:
```bash
npm install
```

3. Crear archivo de variables de entorno:
Crear un archivo `.env` en la raíz del proyecto con la siguiente estructura:
```env
PORT=3000

# Configuración de la base de datos
DB_NAME=api_db
DB_USER=tu_usuario
DB_PASSWORD=tu_password
DB_HOST=localhost
DB_PORT=3306

# Clave secreta para JWT
JWT_SECRET=mi-clave-secreta-AR
```

4. Configurar la base de datos:
   - Crear una base de datos MySQL llamada `api_db`
   - La aplicación creará las tablas automáticamente al iniciar

## Ejecución

- Para desarrollo (con nodemon - reinicio automático):
```bash
npm run dev
```

- Para producción:
```bash
npm start
```

El servidor estará corriendo en `http://localhost:3000` (o el puerto especificado en tu .env)

## Estructura del Proyecto

```
Api-Rest-nodejs/
├── src/
│   ├── app.js           # Punto de entrada de la aplicación
│   ├── config/
│   │   └── database.js  # Configuración de la base de datos
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── categoria.controller.js
│   │   └── producto.controller.js
│   ├── models/
│   │   ├── categoria.model.js
│   │   ├── producto.model.js
│   │   └── usuario.model.js
│   └── routes/
│       ├── auth.routes.js
│       ├── categoria.routes.js
│       └── producto.routes.js
├── .env                 # Variables de entorno
├── .gitignore
├── package.json
└── README.md
```

## Endpoints

### Autenticación
- `POST /api/auth/register`: Registrar un nuevo usuario
- `POST /api/auth/login`: Iniciar sesión

### Productos
- `GET /api/productos/listar`: Listar todos los productos
- `POST /api/productos/crear`: Crear un nuevo producto (Requiere token)

### Categorías
- `GET /api/categorias/listar`: Listar todas las categorías
- `POST /api/categorias/crear`: Crear una nueva categoría (Requiere token)

## Scripts Disponibles

- `npm start`: Inicia la aplicación en modo producción
- `npm run dev`: Inicia la aplicación en modo desarrollo con nodemon
- `npm test`: Ejecuta las pruebas (no implementado aún)

## Notas Importantes

- Asegúrate de tener MySQL corriendo antes de iniciar la aplicación
- No compartas tu archivo `.env` en el repositorio
- Para desarrollo, la aplicación se reiniciará automáticamente con nodemon cuando hagas cambios

## Contribuir

1. Haz un Fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request
