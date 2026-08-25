# Stage 1: Build the React application
FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

# Build the app. Railway can inject ARG VITE_API_URL here if needed.
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# Stage 2: Serve the app with Node.js 'serve'
FROM node:20-alpine

WORKDIR /app

# Install 'serve' to serve static files
RUN npm install -g serve

# Copy built assets from the build stage
COPY --from=build /app/dist /app/dist

# 'serve' must explicitly bind to the Railway injected port
CMD ["sh", "-c", "serve -s dist -l ${PORT:-3000}"]
