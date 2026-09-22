FROM node:20-alpine AS base
WORKDIR /app

# Instalar pnpm
RUN npm install -g pnpm

FROM base AS dependencies
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml* ./
RUN pnpm install --frozen-lockfile

FROM dependencies AS build
COPY . .
# Sembrar base de datos limpia con catálogo oficial (sin credenciales ni sesiones locales)
RUN DATABASE_URL=file:./local.db pnpm db:migrate && DATABASE_URL=file:./local.db pnpm db:seed
RUN pnpm build

FROM base AS runner
ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Directorio para la base de datos persistente SQLite
WORKDIR /app
RUN mkdir -p /app/data && chown -R node:node /app

COPY --chown=node:node package.json pnpm-lock.yaml pnpm-workspace.yaml* ./
RUN pnpm install --prod --frozen-lockfile

COPY --chown=node:node --from=build /app/dist ./dist
COPY --chown=node:node --from=build /app/drizzle ./drizzle
COPY --chown=node:node --from=build /app/local.db ./data/local.db

USER node

EXPOSE 3000

CMD ["node", "./dist/server/entry.mjs"]
