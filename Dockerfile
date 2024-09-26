FROM node:20.17.0

WORKDIR /app

COPY package*.json ./

ENV NODE_ENV=production

COPY . .

RUN npm install --production


RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start"]

