FROM node:18-alpine
WORKDIR /home/app/
COPY package.json .
RUN yarn install
COPY . .
ENV PORT 3000
EXPOSE ${PORT}
CMD yarn run dev
