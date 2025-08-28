# Stage 1: Build Angular app
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Stage 2: NGINX
FROM nginx:alpine
WORKDIR /usr/share/nginx/html

# Copy custom NGINX config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the entire Angular build output
COPY --from=build /app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
