FROM node:20.17.0
WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
EXPOSE 3800
CMD ["npm", "start"]