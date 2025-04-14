# Build stage
FROM node:20.19-alpine AS builder

WORKDIR /app

# Copy only package.json and package-lock.json to leverage Docker cache
COPY package.json package-lock.json ./

RUN npm install --production

COPY . .

RUN npm run build

# Production stage
FROM node:20.19-alpine

WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=builder /app/package.json /app/package-lock.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

ENV NODE_ENV=production

EXPOSE 3000

CMD ["npm", "run", "start"]