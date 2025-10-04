#
# NOTE: THIS DOCKERFILE IS GENERATED VIA "apply-templates.sh"
#
# PLEASE DO NOT EDIT IT DIRECTLY.
#

# https://nodejs.org/en/about/releases/
# https://github.com/nodejs/Release#readme
FROM node:20-alpine3.19

WORKDIR /usr/src/server

COPY package.json ./
COPY . .
RUN npm install
RUN npm update



EXPOSE 8438
CMD ["node", "server.js"]

