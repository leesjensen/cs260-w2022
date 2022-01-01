# Unit 1

## Interesting links

- [GitHub Actions and DigitalOcean](https://www.youtube.com/watch?v=uijgmwOdcXQ)
- [GitHub Event for SCP](https://github.com/garygrossgarten/github-action-scp)

## Introduction

about:blank HTML, CSS

```
<html><head></head><body>
    <h1>Feeling bored?</h1>
    <p class="message">Learn HTML</p>
</body></html>
```

- DNS and HTTP
- https://www.boredapi.com/api/activity/
- host
- Traceroute
- View in Chrome Debug tools

Javascript:

```
fetch('https://www.boredapi.com/api/activity/').then((r)=>r.json()).then((j)=>document.getElementsByClassName("message")[0].innerText=j.activity)
```

## D1 - Command line

Install Iterm2 or Git Bash

```
~
cd
mkdir
rmdir
rm
cat
less
ls
cp
mv
env
echo
grep
top
find (find . -name "*.html")
history
chmod
curl
ssh (ssh root@cs260.leesjensen.com)
scp (scp -r ../html-intro root@cs260.leesjensen.com:html-intro)
vi
df -h
ps -ef
kill
```

Control sequences

```
CTRL-Z, &, and fg
CTRL-R
CTRL-A
CTRL-K
```

Putting it all together

```
find . -name "*.html" | pbcopy
print "my path:\n %s" $path > cow.txt
while true; do date && sleep 1; done;
```

## D2 - Rent Digital Ocean server

- Go to [Digital Ocean](https://www.digitalocean.com/)
- Start 60 free trial
- Rent basic droplet. Make sure you pick **Regular Intel $5 flavor**.

### Create as RSA keys

```
mkdir ~/keys/digitalocean
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

### D3 - install nginx

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

## D4 - Set up DNS

I just used my leesjensen.com hostname and created an A record on Route53 for \*.cs260.leesjensen.com and cs260.leesjensen.com.

```
curl http://lab1.cs260.leesjensen.com/
ssh -i id_rsa root@cs260.leesjensen.com
```

## A1 - Set up hostname cert

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
sudo certbot renew --dry-run                   # Test that auto renew will work
```

Test security with [SSLLabs](https://www.ssllabs.com/)

## D5 - VIM

```
i and ESC
:q (will close each pane and exit on last)
:wq - write and quit
:q! - quit without saving
dd - delete line, 10dd delete 10 lines
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

## D6 - HTML

Demonstration index.html file located in html-intro/index.html. This shows many of the most important HTML tags.

## D7 - GIT

**Install** git - This was installed for my when I installed the Mac command line tools.

**Setup alias as desired**

```
git config --global alias.s status
git config --global alias.l "log --all --graph --decorate --oneline --pretty=format:'%C(bold red)%d%Creset %cr %C(bold yellow)%h%Creset - %C(green)%an%Creset %s'"
```

### Personal Access tokens

These can be used as a password or an OAuth token. They represent both authentication and authorization.
Set up personal access token from `Settings/Developer Settings/Personal Access Tokens` (https://github.com/settings/tokens).
Here are the [docs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).

```
$ git clone https://github.com/username/repo.git
Username: your_username
Password: your_token
```

### Create your repo on GitHub

Even if you already have one locally you need first need to create an empty repo on GitHub and then push your local content up to GitHub.

```
mkdir git-practice
git init
echo "<html><body>Hello</body></html>" > index.html
git add .
git status
git commit -am "Initial commit"
git remote add origin https://github.com/leesjensen/git-practice
git remote -v
git push -u origin master
```

However, it is easier to start with a GitHub repo, clone it, and copy your content in.

```
git clone https://github.com/leesjensen/git-practice.git
```

### Demonstrate

- Status
- Add
- Commit
- Log
- Diff
- Conflict resolution
- Fetch and rebase
- Pull
- Branch

## D7+ Continuous Deployment

Now that the code is in GitHub we can use `GetHub Actions` to push our checked in files to the production server.

- Add secrets to repository's `Settings|Secrets`.
- Add a new workflow to the repository's `Actions|New workflow`.
- Run the workflow or check in code for the defined path.

```
name: CI - Root website

on:
  push:
    branches: [ main ]
    paths: [ 'root/*' ]

  # Allows you to run this workflow manually from the Actions tab
  workflow_dispatch:

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout files
        uses: actions/checkout@v2

      - name: Copy root folder to production server
        uses: garygrossgarten/github-action-scp@release
        with:
          local: root
          remote: /var/www/html
          host: ${{ secrets.HOST }}
          username: ${{ secrets.SSH_USER }}
          privateKey: ${{ secrets.KEY }}
```

## D8 - HTTP

**URL**

- [Overview](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/What_is_a_URL)
- [Wikipedia](https://en.wikipedia.org/wiki/URL)

```

5 Application HTTP
4 Transport TCP, UDP
3 Network IP
2 Data link IEEE 802.2 - Logical link control
1 Physical Ethernet (IEEE 802.3)

```

**Other Application Layer Protocols**
SSH, FTP, SMTP, HTTPS, Teapot

**HTTP format**
URL
Methods
Status codes
Headers - Standard and non standard
CORS
CSP

## D9 - Configure Web Server (NGINX)

NGINX is installed to `/etc/nginx`. Website data is in `/var/www`.

- **/etc/nginx/sties-available** - the websites NGINX can host.
- **/etc/nginx/sties-enabled** - the websites NGINX is currently hosting.
- **/etc/nginx/sites-available/default** - the default config file. Certbot has added cert and website information along with automatic redirects for HTTP.
- **/var/www/** - Where websites are located. html is the default one, but you can add others

Create index.html in `/var/www/html directory`

Modify `/etc/nginx/sites-available/default` to point to different locations by specifying reverse proxy functionality in the `server` objects.

Backup default config

`cp /etc/nginx/sites-available/default /etc/nginx/sites-available/default.bak`

Review syntax of server object

`vi /etc/nginx/sites-available/default`

**Note** - Server section created by certbot
Unlike D9 instructions you don’t need to create a new website config. Just use the server section created by certbot.
Alter server section to point to different directory than /var/www/html

### Make change to point to lab

```
mkdir /var/www/lab1.cs260.leesjensen.com
cd /var/www/lab1.cs260.leesjensen.com
print "<html><body>hello</body></html>" > index.html
vi /etc/nginx/sites-available/default
# Alter server for lab1.cs260.leesjensen.com object to point to new dir
sudo service nginx reload
# Open the browser up and hit the lab1 subdomain.
```

**NGINX Server object**

```
server {
root /var/www/lab1.cs260.leesjensen.com;

    index index.html
    server_name lab1.cs260.leesjensen.com; # managed by Certbot

    location / {
      try_files $uri $uri/ =404;
    }

    listen [::]:443 ssl ipv6only=on; # managed by Certbot
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/lab1.cs260.leesjensen.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/lab1.cs260.leesjensen.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot

}
```

**HTTPS Redirect**

```

server {
if ($host = lab1.cs260.leesjensen.com) {
        return 301 https://$host$request_uri;
} # managed by Certbot

    listen 80 ;
    listen [::]:80 ;
    server_name lab1.cs260.leesjensen.com;
    return 404; # managed by Certbot

}
```
