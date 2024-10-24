FROM node:20-alpine

RUN npm install -g npm@latest
WORKDIR /app/
COPY package.json ./
RUN npm install 
COPY . .
ENV PATH /app/node_modules/.bin:$PATH
EXPOSE 5173
CMD ["npm","run","dev"]
