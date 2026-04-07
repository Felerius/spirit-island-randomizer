# Our nodejs build is completely platform independent
FROM --platform=$BUILDPLATFORM node:24.14.1-alpine@sha256:01743339035a5c3c11a373cd7c83aeab6ed1457b55da6a69e014a95ac4e4700b AS build
WORKDIR /app
RUN corepack enable

COPY pnpm-lock.yaml pnpm-workspace.yaml /app
RUN pnpm fetch

COPY . /app
RUN pnpm install --offline && pnpm build

FROM node:24.14.1-alpine@sha256:01743339035a5c3c11a373cd7c83aeab6ed1457b55da6a69e014a95ac4e4700b

ENV NODE_ENV=production
USER 1000
EXPOSE 3000

COPY --from=build /app/.output /app
CMD ["node", "/app/server/index.mjs"]
