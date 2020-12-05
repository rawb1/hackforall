FROM node:erbium-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM caddy:2-alpine as production-stage
ENV APP_DOMAIN=localhost
ENV SERVER_DOMAIN=localhost
RUN mkdir /app
COPY --from=build-stage /app/dist /usr/share/caddy
COPY ./Caddyfile /etc/caddy/Caddyfile
EXPOSE 80 443