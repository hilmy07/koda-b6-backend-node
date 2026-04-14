# =========================
# STAGE 1: BUILD
# =========================
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .


# =========================
# STAGE 2: PRODUCTION
# =========================
FROM node:20-alpine

WORKDIR /app

COPY --from=build /app /app

EXPOSE 8000

CMD ["npm", "start"]