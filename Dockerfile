FROM docker.harbor.com:5443/public/nginx
LABEL Maintainer="fusion <fusionfintrade.com>"

COPY nginx.conf /etc/nginx/nginx.conf
# todo
ADD dist  /opt/html/scaffold

CMD nginx -g "daemon off;"
