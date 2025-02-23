# Usa la imagen oficial de Node.js en su versión 22.14.0 basada en Alpine (una versión ligera de Linux)
FROM node:22.14.0-alpine3.21

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de dependencias (package.json y package-lock.json) al contenedor
COPY package.json package-lock.json ./

# Instala las dependencias definidas en package.json
RUN npm install

# Copia todos los archivos del proyecto al contenedor
COPY . .

# Ejecuta las pruebas automatizadas antes de iniciar la aplicación
RUN npm test

# Expone el puerto 3000 para que la aplicación pueda recibir tráfico
EXPOSE 3000

# Comando que inicia la aplicación cuando el contenedor se ejecuta
CMD ["node", "src/app.js"]
