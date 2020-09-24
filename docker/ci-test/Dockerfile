
FROM buildkite/puppeteer

WORKDIR /usr/src/app

COPY /package.json /package-lock.json ./

RUN npm install \
    && npm cache clean --force

#COPY karma.conf.js angular.json tsconfig.app.json tsconfig.json tsconfig.spec.json ./

COPY . .

CMD [ "npm",  "test", "--", "--no-watch", "--no-progress", "--browsers=ChromeHeadlessCI" ]
