FROM node:16.13.1-alpine
WORKDIR /app
ADD package*.json ./
COPY . .
RUN npm install
ADD . .

CMD ["cd", "app"]
CMD ["npm","run","start:dev"]