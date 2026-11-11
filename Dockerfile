FROM node:22-alpine AS base
WORKDIR /app

# Instalar pnpm compatible con Node 22
RUN npm install -g pnpm@11.3.0

FROM base AS dependencies
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml* ./
RUN pnpm install

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
RUN pnpm install --prod

COPY --chown=node:node --from=build /app/dist ./dist
COPY --chown=node:node --from=build /app/drizzle ./drizzle
COPY --chown=node:node --from=build /app/local.db /app/seed.db
COPY --chown=node:node scripts/docker-entrypoint.sh /app/docker-entrypoint.sh
COPY --chown=node:node scripts/sync-catalog.mjs /app/scripts/sync-catalog.mjs

RUN chmod +x /app/docker-entrypoint.sh

USER node

EXPOSE 3000

ENTRYPOINT ["/bin/sh", "/app/docker-entrypoint.sh"]
CMD ["node", "./dist/server/entry.mjs"]
