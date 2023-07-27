FROM node:18.16.1 
WORKDIR //var/lib/jenkins/workspace/front/frontend
COPY package*.json ./
RUN npm i -y
COPY . .
# COPY /deploy_conf/nginx.conf /etc/nginx/conf.d/default.conf
RUN npm run build
CMD [ "npm", "run", "start"]
