FROM oven/bun:1.0.3-slim

WORKDIR /web

COPY package*.json bun.lockb ./
RUN bun install
COPY . .

CMD [ "bun", "run", "dev" ]
