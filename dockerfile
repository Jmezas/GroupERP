FROM node:16.15-alpine3.15 as STAGE_BUILD

WORKDIR /code

ADD package*.json .

RUN npm install

ADD . . 

RUN npm run build

# CMD ["npm","run","start"]

FROM node:16.15-alpine3.15

WORKDIR /app

copy --from=STAGE_BUILD /code/node_modules ./node_modules

copy --from=STAGE_BUILD /code/dist ./dist

copy package.json .

copy env.yaml .

CMD ["npm","run","start"]
