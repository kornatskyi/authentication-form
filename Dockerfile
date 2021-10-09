FROM node:16-alpine3.11

WORKDIR /code

COPY package*.json ./

RUN npm install

COPY . .

RUN ["npm", "run", "build"]

EXPOSE 5000/tcp

CMD npm run start:prod