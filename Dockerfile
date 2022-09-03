FROM node:current-alpine3.16
WORKDIR /usr/src/app
RUN npm i -g doctoc@2.1.0 markdown-autodocs
ENTRYPOINT ["markdown-autodocs"]