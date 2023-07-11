# Base image
FROM node:lts

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install --only=prod

# Copy the source code
COPY . .

# Command to run the application
CMD [ "node", "server.js" ]
