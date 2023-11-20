# Path: api/restart-bun.sh

#!/bin/sh

echo "Iniciando el script restart-bun.sh"

BUN_PID=""

start_bun() {
  echo "Iniciando Bun..."
  ## run:
  ## bun run start:dev y bun run test:watch
  bun run start:dev &
  BUN_PID=$!

  bun run test:watch
  echo "Bun iniciado con PID: $BUN_PID"
}

shutdown_bun() {
  echo "Deteniendo Bun..."
  echo "PID de Bun: $BUN_PID"
  if [ ! -z "$BUN_PID" ]; then
    echo "Deteniendo Bun con PID: $BUN_PID..."
    kill -SIGINT "$BUN_PID"
    wait "$BUN_PID"
    echo "Bun detenido."
  else
    echo "No hay un PID de Bun para detener."
  fi
}

# Espera hasta que el puerto esté libre
wait_for_port_to_be_free() {
  echo "Esperando a que el puerto 8000 esté libre..."

  while netcat -z -v localhost 8000 >/dev/null 2>&1; do
    sleep 1
  done

  echo "El puerto 8000 está libre."
}

# Detener Bun
shutdown_bun

# Esperar a que el puerto esté libre
wait_for_port_to_be_free

# Iniciar Bun
start_bun
