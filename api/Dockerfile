# Path: api/Dockerfile

# Usar la imagen oficial de Bun
FROM oven/bun:1.0.14-slim

# Establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar los archivos de definición de dependencias primero para aprovechar la capa de caché de Docker
COPY package.json bun.lockb ./

# Instalar las dependencias de la aplicación
RUN bun install

# Copiar los archivos del proyecto
COPY . .

# Exponer el puerto que tu app utiliza
EXPOSE 8000

# Comando por defecto a ejecutar cuando se inicia el contenedor
CMD ["bun", "run", "start:dev"]
