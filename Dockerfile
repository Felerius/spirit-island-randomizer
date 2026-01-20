# Our nodejs build is completely platform independent
FROM --platform=$BUILDPLATFORM node:24.13.0-alpine@sha256:931d7d57f8c1fd0e2179dbff7cc7da4c9dd100998bc2b32afc85142d8efbc213 AS build
WORKDIR /app
RUN corepack enable

COPY pnpm-lock.yaml pnpm-workspace.yaml /app
RUN pnpm fetch

COPY . /app
RUN pnpm install --offline && pnpm build

FROM node:24.13.0-alpine@sha256:931d7d57f8c1fd0e2179dbff7cc7da4c9dd100998bc2b32afc85142d8efbc213

ENV NODE_ENV=production
USER 1000
EXPOSE 3000

COPY --from=build /app/.output /app
CMD ["node", "/app/server/index.mjs"]
