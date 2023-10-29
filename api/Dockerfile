# Path: api/Dockerfile

FROM oven/bun:1.0.7-slim

# Establecer el directorio de trabajo
WORKDIR /api

# Copiar los archivos package.json y bun.lockb al contenedor
COPY package*.json bun.lockb ./

# Instalar las dependencias de la aplicación
RUN bun install

# Copiar los esquemas de Prisma al contenedor
COPY prisma ./prisma/

# # Copiar el archivo entrypoint.sh al contenedor y darle permisos de ejecución
# COPY entrypoint.sh ./

# # Darle permisos de ejecución al archivo entrypoint.sh
# RUN chmod +x entrypoint.sh

# # Copiar el resto de los archivos al contenedor
# COPY . .

# # Establecer el archivo entrypoint.sh como el punto de entrada de tu contenedor
# ENTRYPOINT ["/api/entrypoint.sh"]

# Comando por defecto a ejecutar cuando se inicia el contenedor
CMD [ "bun", "run", "dev" ]
