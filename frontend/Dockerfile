FROM node

WORKDIR /usr/src/app

COPY package*.json tsconfig.json ./

RUN npm install

COPY src ./src

EXPOSE 3000

RUN npm run build

CMD ["npm", "start"]