FROM node:24-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN chmod +x wait-for-it.sh

RUN npx prisma db push

RUN npx prisma generate

RUN npx prisma db seed

RUN npm run build

EXPOSE 4000

RUN npm run start