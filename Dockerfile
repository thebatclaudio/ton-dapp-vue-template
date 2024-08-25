# Stage 1: Build the Vue.js application
FROM node:20-alpine as build-stage

# Set the working directory
WORKDIR /app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application
COPY . .

# Copy the env file
COPY .env.production .env

# Build the application
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the built application from the build stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy the custom Nginx configuration file
COPY docker/nginx.conf /etc/nginx/nginx.conf

# Expose port 80
EXPOSE 80

# Command to run Nginx
CMD ["nginx", "-g", "daemon off;"]