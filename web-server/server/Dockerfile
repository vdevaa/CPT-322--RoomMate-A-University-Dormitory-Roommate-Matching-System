# they opps forced me to write my own dockerfile because theirs wasnt working its a tough scene out here
FROM node:20-alpine3.19

WORKDIR /usr/src/server

COPY package.json ./
COPY . .
RUN npm install
RUN npm update



EXPOSE 8438
CMD ["node", "server.js"]

