FROM mhart/alpine-node:10

ENTRYPOINT ["docker-entrypoint.sh"]

COPY docker-entrypoint.sh /usr/local/bin

WORKDIR /opt/app

RUN yarn global add nodemon && \
    chmod +x /usr/local/bin/docker-entrypoint.sh

CMD ["nodemon", "app.js"]