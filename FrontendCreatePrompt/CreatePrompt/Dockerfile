# Stage 1: Build the Angular application
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install project dependencies
RUN npm install

# Copy the rest of the application source code to the working directory
COPY . .

# Build the Angular application in production mode
RUN npm run build --prod

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the built Angular application from the previous stage to the Nginx HTML directory
COPY --from=build /app/dist/create-prompt /usr/share/nginx/html

# Expose port 4200 to the outside world
EXPOSE 4200
EXPOSE 80

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]
