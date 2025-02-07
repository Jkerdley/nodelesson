FROM node:20

WORKDIR /usr/src/app

COPY . .

RUN npm i

EXPOSE 3002

CMD [ "npm", "start" ]