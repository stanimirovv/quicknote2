FROM node

RUN apt-get update && apt-get install -y \
sqlite

COPY . .
RUN npm install
RUN node initdb.js

EXPOSE 3000
CMD ["node", "index.js"]
