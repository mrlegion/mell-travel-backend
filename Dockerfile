FROM node:22.22.3-alpine AS base

RUN apk add --no-cache libc6-compat

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

FROM base AS build

COPY . .

RUN npx prisma generate

RUN npx nest build

FROM base AS production

ENV NODE_ENV=production

WORKDIR /app

COPY --from=build /app/package.json ./

RUN npm install

COPY --from=build /app/dist ./dist

COPY --from=build /app/prisma/generated ./prisma/generated

CMD ["node", "dist/src/main"]
