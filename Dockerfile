FROM dunglas/frankenphp:1-php8.5-bookworm AS base

# Instalace PHP rozšíření
RUN install-php-extensions \
    pdo_pgsql \
    pgsql \
    pcntl \
    bcmath \
    opcache \
    zip

# Instalace Node.js a npm do PHP kontejneru pro Vite/Wayfinder
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y nodejs \
    && npm install -g npm@latest \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /app

# Cache vrstev pro závislosti (Composer & NPM)
COPY composer.json composer.lock package.json package-lock.json* ./
RUN composer install --no-dev --no-scripts --no-autoloader --prefer-dist
RUN npm ci

# Zkopírování zdrojového kódu
COPY . .

# Composer autoloader
RUN composer dump-autoload --optimize --no-dev --classmap-authoritative

# Sestavení frontendu (PHP i artisan jsou zde plně dostupné pro Wayfinder)
RUN npm run build \
    && rm -rf node_modules

# Nastavení oprávnění
RUN chown -R www-data:www-data /app/storage /app/bootstrap/cache /app/public/build \
    && chmod -R 775 /app/storage /app/bootstrap/cache

ENV SERVER_NAME="http://:80"
ENV FRANKENPHP_CONFIG=""
ENV LOG_CHANNEL="stderr"

EXPOSE 80

CMD ["frankenphp", "run", "--config", "/etc/caddy/Caddyfile"]
