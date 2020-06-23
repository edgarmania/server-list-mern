# Build in this container
FROM node:12.18.1-alpine3.12 as builder

WORKDIR /app/client

COPY package* /app/client/
COPY yarn* /app/client/

# Set production flag so dev dependencies aren't installed
RUN yarn install --production=true

COPY . /app/client/

# Build the production build
RUN yarn build

# Start and nginx container
FROM nginx

# Set our custom nginx.conf in the container
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/nginx.conf

# Copy the react build from the build container
COPY --from=builder /app/client/build /usr/share/nginx/html

# Set permissions so nginx can serve it
RUN chown nginx.nginx /usr/share/nginx/html/ -R

EXPOSE 3000