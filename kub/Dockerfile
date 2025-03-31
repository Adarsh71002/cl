# Dockerfile
FROM node:14-alpine

# Install netcat for the wait script
RUN apk add --no-cache netcat-openbsd

# Set working directory
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the application code, including wait-for-db.sh
COPY . .

# Ensure the wait script is executable (in case it wasn't already)
RUN chmod +x wait-for-db.sh

# Expose port 3000
EXPOSE 3000

# Start the application with the wait script
CMD ["./wait-for-db.sh"]
