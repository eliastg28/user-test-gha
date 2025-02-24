# Etapa 1: Instalación de dependencias
FROM node:22.14.0-alpine3.21 AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install

# Etapa 2: Construcción y pruebas
FROM node:22.14.0-alpine3.21 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm test

# Etapa 3: Instalación de dependencias de producción
FROM node:22.14.0-alpine3.21 AS prod-deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --prod

# Etapa 4: Imagen final para ejecución
FROM node:22.14.0-alpine3.21 AS runner
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY src src
COPY config config
COPY .env .env
CMD ["node", "src/app.js"]
