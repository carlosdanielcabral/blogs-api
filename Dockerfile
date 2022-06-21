FROM node:16
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN chmod 777 node_modules
CMD [ "npm", "start" ]
EXPOSE 3001
