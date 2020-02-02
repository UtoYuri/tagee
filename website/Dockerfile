FROM node:12.14-alpine

WORKDIR /app

ADD . .
RUN yarn
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]