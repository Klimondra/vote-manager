# STAGE 1: React build
FROM node:24-alpine AS frontend
WORKDIR /app

COPY package*.json .
RUN npm ci

COPY . .

RUN npm run build

# STAGE 2: Composer
FROM composer:2-alpine AS composer
WORKDIR /app

COPY composer.json composer.lock ./

RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader

# STAGE 3: Runtime
FROM php:8.5-fpm-alpine
WORKDIR /var/www/html

RUN apk add --no-cache \
    nginx \
    supervisor \
    postgresql-dev \
    icu-dev \
    libzip-dev \
    oniguruma-dev \
    zip

RUN docker-php-ext-install \
    pdo_pgsql \
    intl \
    zip \
    bcmath

COPY . .
COPY --from=composer /app/vendor ./vendor
COPY --from=frontend /app/public/build ./public/build

RUN php artisan config:cache
RUN php artisan route:cache
RUN php artisan view:cache

RUN chown -R www-data:www-data \
    storage \
    bootstrap/cache

COPY docker/nginx/default.conf \
     /etc/nginx/http.d/default.conf


COPY docker/supervisor/supervisord.conf \
     /etc/supervisord.conf



EXPOSE 8080



CMD [
"supervisord",
"-c",
"/etc/supervisord.conf"
]
