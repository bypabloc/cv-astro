#!/bin/sh

# Este script asume que existe una variable de entorno llamada ENVIRONMENT
# que puede ser 'development' o 'test'.

if [ "$ENVIRONMENT" = "development" ]; then
  cp ./backend.env .env
elif [ "$ENVIRONMENT" = "test" ]; then
  cp ./backend.test.env .env
else
    echo "No se ha definido la variable de entorno ENVIRONMENT"
    exit 1
fi

# Ejecutar el comando de Prisma o cualquier otro proceso necesario
npm run prisma:generate

# Continuar con el inicio de la aplicación
exec "$@"
