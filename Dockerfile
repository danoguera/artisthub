FROM node

RUN mkdir -p /usr/src/app/frontend
WORKDIR /usr/src/app/frontend


COPY . .

RUN npm install

EXPOSE 3002

CMD ["npm", "start"]