#Install_Component
FROM node:18-alpine3.15 AS build
WORKDIR /app

RUN apk add --no-cache curl
RUN curl -sL https://unpkg.com/@pnpm/self-installer | node

COPY package.json package.json
COPY pnpm-lock.yaml pnpm-lock.yaml

RUN pnpm install --force
COPY . .
RUN pnpm run build

#Prodution_build
FROM node:18-alpine3.15
WORKDIR /app
COPY --from=build ./app/build .
COPY --from=build ./app/package.json .
COPY ./.env .
RUN apk add --no-cache curl
RUN curl -sL https://unpkg.com/@pnpm/self-installer | node
RUN ls
RUN pnpm install -p
EXPOSE 3000
CMD [ "node", "index.js" ]
