FROM oven/bun:1.0.6-slim

WORKDIR /web

COPY package*.json bun.lockb ./
RUN bun install
COPY . .

CMD [ "bun", "--hot", "run", "dev" ]
