# Use an official Node.js runtime as the base image
FROM node:23.4.0

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .


EXPOSE 3068


CMD ["npm", "run", "serve", "--", "--port", "3068"]