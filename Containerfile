# Our nodejs build is completely platform independent
FROM --platform=$BUILDPLATFORM node:23.11.1-alpine@sha256:a34e14ef1df25b58258956049ab5a71ea7f0d498e41d0b514f4b8de09af09456 AS build
WORKDIR /app
RUN corepack enable

COPY pnpm-lock.yaml /app
RUN pnpm fetch

COPY . /app
RUN pnpm install --offline && pnpm build

FROM node:23.11.1-alpine@sha256:a34e14ef1df25b58258956049ab5a71ea7f0d498e41d0b514f4b8de09af09456

ENV NODE_ENV=production
USER node
EXPOSE 3000

COPY --from=build /app/.output /app
CMD ["node", "/app/server/index.mjs"]
