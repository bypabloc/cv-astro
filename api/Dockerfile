# Path: api/Dockerfile

FROM oven/bun:1.0.7-slim

WORKDIR /api

COPY package*.json bun.lockb ./
RUN bun install
COPY . .

CMD [ "bun", "run", "dev" ]
