# Etapa 1: Construcción
FROM node:25.5.0 AS build

# Directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json o pnpm-lock.yaml
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del proyecto
COPY . .

# Construir la app para producción
RUN npm run build

# Etapa 2: Servir la app
FROM nginx:alpine

# Copiar los archivos de build al directorio de nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto
EXPOSE 5173

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]
