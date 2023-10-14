FROM oven/bun:1.0.6-debian

WORKDIR /api

COPY package*.json bun.lockb ./
RUN bun install
COPY . .

CMD [ "bun", "run", "dev" ]
