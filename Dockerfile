FROM node:18.17.1-bullseye-slim as builder
RUN apt-get update && apt-get upgrade -y

WORKDIR /app

# get dependencies first separately
COPY package.json package-lock.json ./
RUN npm ci

# the rest of the source code needed for building
COPY . .

RUN npm run build


FROM node:18.17.1-bullseye-slim as deployment
RUN apt-get update && apt-get upgrade -y

# keep only the needed files
COPY --from=builder /app/build /app/build

WORKDIR /app
ENV NODE_ENV production
