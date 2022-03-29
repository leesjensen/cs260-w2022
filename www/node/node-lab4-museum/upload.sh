# Build
pushd front-end
rm -rf public/images/
npm run build
popd

printf "%s" $(date +%F-%T) > back-end/version.txt

# Copy to production
ssh -i ~/keys/cs260/id_rsa root@cs260.click 'mkdir -p /var/www/lab4/front-end/public/images' 
scp -i ~/keys/cs260/id_rsa -r front-end/dist/* root@cs260.click:/var/www/lab4/front-end/public

ssh -i ~/keys/cs260/id_rsa root@cs260.click 'mkdir -p /var/www/lab4/back-end' 
scp -i ~/keys/cs260/id_rsa back-end/*.js back-end/*.json back-end/version.txt root@cs260.click:/var/www/lab4/back-end/
ssh -i ~/keys/cs260/id_rsa root@cs260.click 'cd /var/www/lab4/back-end; npm install' 

# Test it is running
ssh -i ~/keys/cs260/id_rsa root@cs260.click "curl -i -s localhost:5400/api/version; printf '\n---------\n'"

# Check out the result
open -a "Google Chrome" "https://lab4.cs260.click"


# server {

#     root /var/www/lab4/front-end/public;

#     index index.html;
#     server_name lab4.cs260.click; # managed by Certbot

#     location / {
#         try_files $uri $uri/ /index.html;
#     }

#     location /api {
#         proxy_pass http://localhost:5400;
#     }

#     listen 443 ssl; # managed by Certbot
#     ssl_certificate /etc/letsencrypt/live/lab4.cs260.click/fullchain.pem; # managed by Certbot
#     ssl_certificate_key /etc/letsencrypt/live/lab4.cs260.click/privkey.pem; # managed by Certbot
#     include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
#     ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

# }
