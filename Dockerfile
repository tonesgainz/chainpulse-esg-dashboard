# Multi-stage Dockerfile for ChainPulse ESG Dashboard
# Optimized for production deployment

# ============================================
# Stage 1: Build
# ============================================
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Install build dependencies
RUN apk add --no-cache \
    python3 \
    make \
    g++

# Copy package files
COPY package.json package-lock.json ./

# Install dependencies
# Use ci for clean install from lockfile
RUN npm ci --only=production=false

# Copy source files
COPY . .

# Build the application
# This creates the dist/ directory
RUN npm run build

# ============================================
# Stage 2: Production
# ============================================
FROM nginx:alpine AS production

# Install curl for healthchecks
RUN apk add --no-cache curl

# Copy custom nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Copy built assets from builder stage
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy additional static files
COPY --from=builder /app/public /usr/share/nginx/html

# Create nginx cache directories
RUN mkdir -p /var/cache/nginx/client_temp && \
    mkdir -p /var/cache/nginx/proxy_temp && \
    chown -R nginx:nginx /var/cache/nginx

# Expose port 80
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost/health || exit 1

# Start nginx
CMD ["nginx", "-g", "daemon off;"]

# ============================================
# Stage 3: Development
# ============================================
FROM node:18-alpine AS development

# Set working directory
WORKDIR /app

# Install dependencies
RUN apk add --no-cache git

# Copy package files
COPY package.json package-lock.json ./

# Install all dependencies (including dev)
RUN npm ci

# Copy source files
COPY . .

# Expose Vite dev server port
EXPOSE 8080

# Start development server
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# ============================================
# Build Arguments
# ============================================
# Build with specific stage:
# docker build --target production -t chainpulse-esg-dashboard:prod .
# docker build --target development -t chainpulse-esg-dashboard:dev .
