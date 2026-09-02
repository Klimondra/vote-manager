# --- Stage 1: Build frontendu (Node.js & Vite) ---
FROM node:22-alpine AS frontend

WORKDIR /app

COPY package.json package-lock.json* pnpm-lock.yaml* yarn.lock* ./
RUN \
    if [ -f package-lock.json ]; then npm ci; \
    elif [ -f pnpm-lock.yaml ]; then corepack enable pnpm && pnpm i --frozen-lockfile; \
    elif [ -f yarn.lock ]; then yarn --frozen-lockfile; \
    else npm install; \
    fi

COPY . .
RUN npm run build


# --- Stage 2: Produkční FrankenPHP ---
FROM dunglas/frankenphp:1-php8.5-bookworm AS base

RUN install-php-extensions \
    pdo_pgsql \
    pgsql \
    pcntl \
    bcmath \
    opcache \
    zip

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Composer závislosti
COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist

# Zkopírování zbytku aplikace
COPY . .

# Zkopírování sestavených assetů z Node stage
COPY --from=frontend /app/public/build /app/public/build

RUN composer dump-autoload --optimize --no-dev --classmap-authoritative

RUN chown -R www-data:www-data /app/storage /app/bootstrap/cache /app/public/build \
    && chmod -R 775 /app/storage /app/bootstrap/cache

ENV SERVER_NAME="http://:80"
ENV FRANKENPHP_CONFIG=""
ENV LOG_CHANNEL="stderr"

EXPOSE 80

CMD ["frankenphp", "run", "--config", "/etc/caddy/Caddyfile"]
