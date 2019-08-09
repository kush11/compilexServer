FROM codemirror/compilex
MAINTAINER Kush, kush.kumar@pratian.com

RUN apt-get update && \
    nginx && \
    # cd /var/www/html/js && node server.js
    

COPY ./ /var/www/html

RUN cd /var/www/html/js && node server.js

