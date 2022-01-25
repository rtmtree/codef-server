FROM node:16-alpine
WORKDIR /app

##ignore if don't have react with typescript
COPY tsconfig.json .

COPY package.json .
COPY yarn.lock .
COPY src ./src

RUN yarn
RUN yarn build

FROM node:16-alpine
WORKDIR /app
COPY package.json ./
COPY yarn.lock .
RUN yarn --prod
COPY --from=0 /app/dist .
RUN yarn global add pm2

CMD ["pm2-runtime", "app.js"]