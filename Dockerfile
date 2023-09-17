FROM node
WORKDIR .
COPY . .
EXPOSE 5000
ENV PORT=5000
CMD npm install ; npm run start