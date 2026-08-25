# Stage 1: Build the React application
FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Build the app. Railway can inject ARG VITE_API_URL here if needed.
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# Stage 2: Serve the app with Nginx
FROM nginx:alpine

# Copy the custom nginx configuration for React Router
COPY nginx.conf /etc/nginx/templates/default.conf.template

# Copy the built assets from the build stage
COPY --from=build /app/dist /usr/share/nginx/html
RUN chmod -R 755 /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]
