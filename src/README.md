# Node.js MySQL API

Esta es una API básica en Node.js con Express y MySQL para gestionar usuarios.

## 🚀 Instalación y ejecución

### 1. Clonar el repositorio
```sh
git clone <URL_DEL_REPOSITORIO>
cd node-app
```

### 2. Configurar variables de entorno
Crear un archivo `.env` en la raíz y definir:
```sh
DB_HOST=your-railway-host
DB_USER=your-username
DB_PASSWORD=your-password
DB_NAME=your-database
DB_PORT=3306
PORT=3000
```

### 3. Instalar dependencias
```sh
npm install
```

### 4. Ejecutar la aplicación
```sh
npm start
```

La API estará disponible en `http://localhost:3000/api`

## 📦 Uso con Docker
### 1. Construir la imagen
```sh
docker build -t node-mysql-api .
```

### 2. Ejecutar el contenedor
```sh
docker run -p 3000:3000 --env-file .env node-mysql-api
```

## 📌 Endpoints
- `POST /api/users` - Crear usuario
- `PUT /api/users/:id` - Actualizar usuario
- `DELETE /api/users/:id` - Eliminar usuario
