FROM node:24-alpine AS base

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

FROM base AS build

COPY . .

RUN npm install -g @nestjs/cli

RUN npx prisma generate

RUN npm run build

FROM base AS production

ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /app/package.json /app/package-lock.json

RUN npm install --production

COPY --from=build /app/dist ./dist

COPY --from=build /app/prisma/generated ./prisma/generated

CMD ["node", "dist/main"]
