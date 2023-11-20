# Path: web/Dockerfile

FROM oven/bun:1.0.7-slim

# Establecer el directorio de trabajo
WORKDIR /api

# Copiar los archivos package.json y bun.lockb al contenedor
COPY package*.json bun.lockb ./

# Instalar las dependencias de la aplicación
RUN bun install

# Copiar los archivos del proyecto
COPY . .

# Comando por defecto a ejecutar cuando se inicia el contenedor
CMD [ "bun", "run", "dev" ]
