# You should always specify a full version here to ensure all of your developers
# are running the same version of Node.
FROM node:10.16.0

# The base node image sets a very verbose log level.
ENV NPM_CONFIG_LOGLEVEL warn

# Copy all local files into the image.
COPY . .

# install
RUN npm install
RUN npm rebuild node-sass

# Build for production.
CMD ["npm", "start"]

# Tell Docker about the port we'll run on.
EXPOSE 3000