FROM nginx:alpine
LABEL authors="https://how64bit.com"
COPY ./shopping-cart-demo/  /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
