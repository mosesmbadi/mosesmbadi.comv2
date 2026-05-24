FROM oven/bun:1-alpine

WORKDIR /frontend

COPY package.json bun.lockb* bun.lock* ./

# Explicitly set the environment to development, and use Bun's dev flag
ENV NODE_ENV=development
RUN bun install --development

COPY . .

EXPOSE 5173

CMD ["bun", "run", "dev", "--host"]