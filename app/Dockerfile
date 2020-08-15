FROM node:12

# Create app directory
WORKDIR /node/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json /node/app

RUN npm install

# Bundle app source
COPY . /node/app

USER node
RUN whoami

CMD ["npm", "run", "start"]