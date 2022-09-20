FROM nginx:1.10
COPY dist/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx
RUN true
VOLUME /mydata/nginx/conf:/etc/nginx
VOLUME /mydata/nginx/html:/usr/share/nginx/html
VOLUME /mydata/nginx/log:/var/log/nginx
