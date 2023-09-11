# syntax = docker/dockerfile:1

# change BUN_VERSION if needed
ARG BUN_VERSION=latest
FROM oven/bun:${BUN_VERSION} as base

LABEL fly_launch_runtime="Bun"

WORKDIR /app

# set production environment
ENV NODE_ENV=production


# build stage
FROM base as build

# install node_modules
COPY --link bun.lockb package.json ./
RUN bun install --ci

# copy application code
COPY --link . .

## run bundler
#RUN bun run build:bun


# production stage
FROM base

## copy bundled output
#COPY --from=build /app/bin /app/bin
# copy application code
COPY --from=build /app /app

# start the server at default port (3000)
EXPOSE 3000
#CMD [ "bun", "bin/index.js" ]
CMD [ "bun", "src/index.ts" ]
