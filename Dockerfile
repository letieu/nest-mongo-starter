FROM node:14-alpine3.13
WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]
RUN npm ci
COPY . .
CMD ["npm", "run", "start:dev"]
EXPOSE 3000
