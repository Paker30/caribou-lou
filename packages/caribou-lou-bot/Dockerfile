FROM node:9-alpine

LABEL maintainer="morenocfrancisco86@gmail.com"

# Create the required folder
WORKDIR /home

COPY package.json package.json

# Install Node dependencies and remove NPM cache
RUN npm install --production -q && \
    npm cache clean --force && \
    rm -rf /home/$user/.node-gyp && \
    rm -rf /tmp/npm-* &&\
# Copy the App
ADD . .

EXPOSE 3978

CMD [ "npm", "start" ]
