
# Unit 1

## Rent Digital Ocean server
* Go to [Digital Ocean](https://www.digitalocean.com/)
* Start 60 free trial
* Rent basic droplet. Make sure you pick **Regular Intel $5 flavor**.

### Create as RSA keys
```
cd ~/keys/digitalocean
ssh-keygen
```

### enable firewall
```
ssh -i id_rsa root@104.131.72.225
sudo ufw app list
sudo ufw allow OpenSSH
sudo ufw enable
sudo ufw status
```

### install nginx
```
sudo apt-get update
sudo apt-get install nginx
sudo ufw app list
sudo ufw allow 'Nginx Full'
sudo ufw status
systemctl status nginx
```

### install other goodies
```
sudo apt-get install curl
sudo apt-get install jq
```

### test that it all works
```
curl 'https://www.boredapi.com/api/activity/' | jq '.'
curl -4 icanhazip.com # Use this service to return back your IPV4 address
curl 104.131.72.225 # Replace this with your IP address for your Digital Ocean server
```

## Set up DNS
I just used my leesjensen.com hostname and created an A record on Route53 for *.cs260.leesjensen.com and cs260.leesjensen.com.

```
curl http://lab1.cs260.leesjensen.com/
ssh -i id_rsa root@cs260.leesjensen.com
```

## Set up hostname cert
Follow instructions for DNS wildcard cert found [here](https://certbot.eff.org/).
Specify the OS and server software. 

Note that you can create a wildcard cert, but you have to create an AWS access token that will allow certbot to modify Route53 with the DNS response.

```
sudo snap install core; sudo snap refresh core # Snap is automatically installed with Ubuntu 20
sudo snap install --classic certbot            # install cerbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot  # link so you can run cerbot from anywhere
sudo certbot --nginx                           # Provide email and hostname you want the cert for. This automatically configures NGINX
sudo certbot --nginx -d cs260.leesjensen.com   # OR specify the hostname you want the cert for on the command line.
curl https://cs260.leesjensen.com
```

## NGINX notes
NGINX is installed to ```/etc/nginx```. There you will find the following interesting folders and files:

* **sties-available** - the websites NGINX can host.
* **sties-enabled** - the websites NGINX is currently hosting.
* **sites-available/default** - the default config file. Certbot has added cert and website information along with automatic redirects for HTTP.
q
Create index.html in ```/var/www/html directory```

## VIM

```
i and ESC
:q (will close each pane and exit on last)
:wq - write and quit
:q! - quit without saving
dd - delete line
u - undo
CTRL-r  - redo
Gg - top of file
G - bottom of file
45G - go to line 45 (putting numbers in front will repeat a command)
/cats - search for cats
n (next) N (prev)
:%s/fish/pig - search and replace
ZZ - quick save and quit
:e - open file
:split to create new pane
CTRL-W to toggle between panes
```
