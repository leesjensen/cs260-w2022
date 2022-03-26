# Build
pushd front-end
rm -rf public/images/
npm run build
popd

printf "%s" $(date +%F-%T) > back-end/version.txt

# Copy to production
ssh -i ~/keys/digitalocean/id_rsa root@cs260.click 'mkdir -p /var/www/lab4.cs260.click/front-end/public/images' 
scp -i ~/keys/digitalocean/id_rsa -r front-end/dist/* root@cs260.click:/var/www/lab4.cs260.click/front-end/public

ssh -i ~/keys/digitalocean/id_rsa root@cs260.click 'mkdir -p /var/www/lab4.cs260.click/back-end' 
scp -i ~/keys/digitalocean/id_rsa back-end/*.js back-end/*.json back-end/version.txt root@cs260.click:/var/www/lab4.cs260.click/back-end/
ssh -i ~/keys/digitalocean/id_rsa root@cs260.click 'cd /var/www/lab4.cs260.click/back-end; npm install' 

# Test it is running
ssh -i ~/keys/digitalocean/id_rsa root@cs260.click "curl -i -s localhost:5400/api/version; printf '\n---------\n'"

# Check out the result
open -a "Google Chrome" "https://lab4.cs260.click"