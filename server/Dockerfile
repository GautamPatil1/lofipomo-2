FROM node:20.9.0

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm install

EXPOSE 5000

CMD [ "npm", "start" ]