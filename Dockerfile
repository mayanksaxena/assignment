FROM mhart/alpine-node:10

ENTRYPOINT ["docker-entrypoint.sh"]

COPY docker-entrypoint.sh /usr/local/bin

WORKDIR /opt/app

RUN chmod +x /usr/local/bin/docker-entrypoint.sh

CMD ["node", "app.js"]