FROM node:14

WORKDIR /usr/src/vaga

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 8080

CMD ["yarn", "dev"]
