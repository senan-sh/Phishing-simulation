FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY ./shared-backend ./shared-backend
RUN cd ./shared && npm install

COPY ./backend1 .

EXPOSE 3000

CMD ["npm", "start"]
