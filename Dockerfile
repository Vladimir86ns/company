FROM node:10.16.0

COPY . .

RUN npm install
RUN npm rebuild node-sass

CMD ["npm", "start"]

EXPOSE 3000