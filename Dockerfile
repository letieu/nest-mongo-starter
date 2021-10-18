FROM node:14-alpine3.13
WORKDIR /app
ENV NODE_ENV=production

RUN npm install -g @nestjs/cli
COPY ["package.json", "package-lock.json*", "./"]
RUN npm ci --production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
