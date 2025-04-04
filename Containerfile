FROM node:23-alpine AS build
WORKDIR /app
RUN corepack enable

COPY pnpm-lock.yaml /app
RUN pnpm fetch

COPY . /app
RUN pnpm install --offline && pnpm build

FROM node:23-alpine

ENV NODE_ENV=production
USER node
EXPOSE 3000

COPY --from=build /app/.output /app
CMD ["node", "/app/server/index.mjs"]
