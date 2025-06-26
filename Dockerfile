# Stage 1: Build React TypeScript app
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy dependency files
COPY tailwind.config.js ./
COPY postcss.config.js ./
COPY index.html ./
COPY package*.json ./
COPY tsconfig*.json ./
COPY vite.config.* ./

# Install dependencies
RUN npm install

# Copy source files
COPY public ./public
COPY src ./src

# Build the application
RUN npm run build

# Stage 2: Serve with NGINX
FROM nginx:alpine

# Copy custom NGINX config for SPA
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built app from previous stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run NGINX in foreground
CMD ["nginx", "-g", "daemon off;"]
