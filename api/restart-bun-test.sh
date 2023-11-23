# Path: api/restart-bun-test.sh

#!/bin/sh

echo "Iniciando el script restart-bun-test.sh"

BUN_PID=""

start_bun() {
  echo "Iniciando Bun..."

  BUN_PID=$!

  bun run test:watch

  echo "Bun iniciado con PID: $BUN_PID"
}

# Iniciar Bun
start_bun
