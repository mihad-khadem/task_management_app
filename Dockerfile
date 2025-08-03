# Use the official Bun image
FROM oven/bun:1.1

# Set the working directory
WORKDIR /app

# Install procps for 'ps' command (needed by NestJS dev tooling)
RUN apt-get update && apt-get install -y procps

# Copy all files to the container
COPY . .

# Install dependencies
RUN bun install

# Generate Prisma client inside the container
RUN bunx prisma generate

# Expose the port your app runs on
EXPOSE 3000

# Start the dev server
CMD ["bun", "run", "start:dev"]
