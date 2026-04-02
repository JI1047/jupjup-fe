# syntax=docker/dockerfile:1.7
FROM node:20-alpine AS deps
WORKDIR /app

COPY package*.json ./
RUN --mount=type=cache,target=/root/.npm \
    npm ci --no-audit --prefer-offline

FROM node:20-alpine AS build
WORKDIR /app

ENV CI=false
ENV GENERATE_SOURCEMAP=false

COPY --from=deps /app/node_modules ./node_modules
COPY package*.json ./
COPY public ./public
COPY src ./src

RUN --mount=type=cache,target=/app/node_modules/.cache \
    npm run build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
