#for node app
FROM node:14

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm install sequelize-cli --save

COPY . .

EXPOSE 3000
COPY ./docker-entrypoint.sh /docker-entrypoint.sh


VOLUME [ "/app/node_modules" ]

RUN chmod +x /docker-entrypoint.sh

ENTRYPOINT ["/docker-entrypoint.sh"]
