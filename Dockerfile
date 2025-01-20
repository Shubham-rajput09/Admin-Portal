# Use the official Nginx image as the base
FROM nginx:alpine

# Copy the production build to the default Nginx directory
COPY dist/ /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]
