FROM node:16-alpine

EXPOSE 8080
RUN mkdir -p /app
WORKDIR /app

##ignore if don't have react with typescript
COPY tsconfig.json /app/tsconfig.json 

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock

## install only the packages defined in the package-lock.json (faster than the normal npm install)
RUN yarn

# Run 'npm run dev' when the container starts.
CMD ["yarn", "start:dev"]