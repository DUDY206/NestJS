# Docker with Nestjs
Build enviroment for NestJs, Nginx, MySQL, PHPMyAdmin by Docker-compose step by step
![This is an image](https://raw.githubusercontent.com/DUDY206/NestJs/519ea0e56fe982cd80f73ac0dc6473ac77f2466c/docker-env.png)

- **Step 1**: Install **NodeJs** in local host
    ```
    sudo apt-get install npm
    ```
- **Step 2**: Clone NestJs project from github and install it
    ```
    git clone https://github.com/nestjs/typescript-starter.git 
    npm install
    ```
- **Step 3**: Setting Dockerfile for NestJs
    ```
    FROM node:14-alpine3.14

    RUN mkdir -p /var/www/nestjs
    WORKDIR /var/www/nestjs
    
    COPY . .
    
    RUN npm install
    RUN npm install -g @nestjs/cli
    
    CMD ["npm", "run", "start:dev"]
    ```
    NestJs service will comunicate with local host by port 3002
- **Step 4**: Setting docker-compose.yml 

    ```
    version: '3.7'
    networks: 
      backend:
        driver: bridge
    
    services: 
      nestjs:
        build: 
          context: .
          dockerfile: docker/nestjs/Dockerfile
        container_name: prj_nestjs
        restart: always
        volumes: 
          - ./:/var/www/nestjs
        networks: 
          - backend
      
      nginx:
        container_name: prj_nginx
        image: nginx:1.16.1-alpine
        restart: always
        volumes: 
        - ./docker/nginx/nginx.conf:/etc/nginx/conf.d/nginx.conf
        - ./docker/log/nginx:/var/log/nginx
        ports: 
          - '80:80'
          - '443:443'
        networks: 
        - backend
    
      mysql:
        container_name: prj_mysql
        image: mysql:5.7.22
        restart: always
        environment: 
          - MYSQL_ROOT_PASSWORD=abcdef123
          - MYSQL_DATABASE=nestjs
          - MYSQL_USER=dudy206
          - MYSQL_PASSWORD=abcdef123
        networks: 
          - backend
        
      phpmyadmin:
        container_name: prj_phpmyadmin
        image: phpmyadmin:5.1.0
        environment: 
          - PMA_HOST=mysql
          - PMA_PORT=3306
          - PMA_USER=root
          - PMA_PASSWORD=abcdef123
          - UPLOAD_LIMIT=20000000
        ports: 
          - '8181:80'
        networks: 
          - backend
        depends_on: 
          - mysql

    ```
- **Step 5**: Setting Nginx 
    ```
    server{
        listen 80;
        server_name backend.test.com;
        root /var/www/nestjs/dist;
        add_header X-Frame-Options "SAMEORIGIN";
        add_header X-XSS-Protection "1; mode=block";
        add_header X-Content-Type-Options "nosniff";
        charset utf-8;
        location / {
            proxy_pass http://nestjs:3000;
            proxy_set_header Upgrade $http_upgrade ;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;
        }
    
        location ~/\.(?!well-known).* {
            deny all;
        }
    }
    ```

