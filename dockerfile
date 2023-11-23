# import node image
FROM node:12.18.3-alpine3.12

WORKDIR /app

# copy package.json and package-lock.json
COPY package*.json ./

# install dependencies
RUN npm install

# copy all files
COPY . .

# expose port 3000
EXPOSE 3000

# run the app
CMD ["npm", "run", "dev"]