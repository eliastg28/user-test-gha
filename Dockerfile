# Etapa 1: Instalación de dependencias
FROM node:22.14.0-alpine3.21 AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --omit=dev

# Etapa 2: Construcción
FROM node:22.14.0-alpine3.21 AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . . 

# Etapa 3: Imagen final para ejecución
FROM node:22.14.0-alpine3.21 AS runner
WORKDIR /app
COPY --from=builder /app /app
CMD ["node", "src/app.js"]
