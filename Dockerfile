FROM node:20.19-alpine AS build
WORKDIR /app

ARG VITE_JAVA_APP_API_BACKEND_URL=http://localhost:8080/api
ARG VITE_EMAILJ_PUBLIC_KEY=
ENV VITE_JAVA_APP_API_BACKEND_URL=$VITE_JAVA_APP_API_BACKEND_URL
ENV VITE_EMAILJ_PUBLIC_KEY=$VITE_EMAILJ_PUBLIC_KEY

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
