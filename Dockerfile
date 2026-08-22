FROM dunglas/frankenphp:1-php8.5-alpine AS base

RUN apk add --no-cache \
    postgresql-dev \
    libzip-dev \
    zip \
    unzip \
    && install-php-extensions \
    pdo_pgsql \
    pgsql \
    pcntl \
    bcmath \
    opcache \
    zip

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist

COPY . .

RUN composer dump-autoload --optimize --no-dev --classmap-authoritative

RUN chown -R www-data:www-data /app/storage /app/bootstrap/cache \
    && chmod -R 775 /app/storage /app/bootstrap/cache

ENV SERVER_NAME=":8080"
ENV FRANKENPHP_CONFIG=""
ENV LOG_CHANNEL="stderr"

EXPOSE 8080

ENTRYPOINT ["/usr/local/bin/frankenphp"]
CMD ["run", "--config", "/etc/caddy/Caddyfile"]