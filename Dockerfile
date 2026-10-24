# Our nodejs build is completely platform independent
FROM --platform=$BUILDPLATFORM node:24.22.1-alpine@sha256:06d7adf3e0ef61a13f1d28682726366f97a15aa1888c934d3ecec86c33918b53 AS build
WORKDIR /app
RUN corepack enable

COPY pnpm-lock.yaml pnpm-workspace.yaml /app
RUN pnpm fetch

COPY . /app
RUN pnpm install --offline && pnpm build

FROM node:24.22.1-alpine@sha256:06d7adf3e0ef61a13f1d28682726366f97a15aa1888c934d3ecec86c33918b53

ENV NODE_ENV=production
USER 1000
EXPOSE 3000

COPY --from=build /app/.output /app
CMD ["node", "/app/server/index.mjs"]
