FROM node:14-alpine3.14

RUN mkdir -p /var/www/nestjs
WORKDIR /var/www/nestjs

COPY . .

RUN npm install
RUN npm install -g @nestjs/cli

CMD ["npm", "run", "start:dev"]