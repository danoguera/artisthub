FROM node

RUN mkdir -p /usr/src/app/frontend
WORKDIR /usr/src/app/frontend


COPY . .

RUN npm install

RUN npm run build
RUN npm install --global serve
EXPOSE 5000

#CMD ["npm", "start"]
CMD ["serve", "build"]