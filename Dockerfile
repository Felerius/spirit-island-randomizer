# Our nodejs build is completely platform independent
FROM --platform=$BUILDPLATFORM node:24.15.0-alpine@sha256:d1b3b4da11eefd5941e7f0b9cf17783fc99d9c6fc34884a665f40a06dbdfc94f AS build
WORKDIR /app
RUN corepack enable

COPY pnpm-lock.yaml pnpm-workspace.yaml /app
RUN pnpm fetch

COPY . /app
RUN pnpm install --offline && pnpm build

FROM node:24.15.0-alpine@sha256:d1b3b4da11eefd5941e7f0b9cf17783fc99d9c6fc34884a665f40a06dbdfc94f

ENV NODE_ENV=production
USER 1000
EXPOSE 3000

COPY --from=build /app/.output /app
CMD ["node", "/app/server/index.mjs"]
