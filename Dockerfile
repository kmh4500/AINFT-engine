FROM node:14-alpine AS runner

COPY . /app

WORKDIR /app

ENV NODE_ENV production
RUN npm install
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
