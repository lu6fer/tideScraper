FROM node:lts-alpine
WORKDIR /opt/tideScraper
COPY package*.json ./
ENV NODE_ENV="production"
RUN npm install
COPY . .

EXPOSE 3000
CMD [ "npm", "start" ]
