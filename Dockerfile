FROM node:20-alpine AS base
WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

FROM base AS dependencies
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml* ./
RUN pnpm install --frozen-lockfile

FROM dependencies AS build
COPY . .
RUN pnpm build

FROM base AS runner
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Directorio para la base de datos persistente SQLite
WORKDIR /app
RUN mkdir -p /app/data

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml* ./
RUN pnpm install --prod --frozen-lockfile

COPY --from=build /app/dist ./dist
COPY --from=build /app/drizzle ./drizzle
COPY --from=build /app/local.db ./data/local.db

EXPOSE 3000

CMD ["node", "./dist/server/entry.mjs"]
