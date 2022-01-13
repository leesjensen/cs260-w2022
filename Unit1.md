# Unit 1

## Interesting links

- [GitHub Actions and DigitalOcean](https://www.youtube.com/watch?v=uijgmwOdcXQ)
- [GitHub Event for SCP](https://github.com/garygrossgarten/github-action-scp)
- [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

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
CTRL-C
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

### put something nice on the website

```
vi /var/www/html/index.nginx-debian.html
```

### test that it all works

```
curl 'https://www.boredapi.com/api/activity/' | jq '.'
curl -4 icanhazip.com # Use this service to return back your IPV4 address
curl 104.131.72.225 # Replace this with your IP address for your Digital Ocean server
```

## D4 - Set up DNS

Show how this works on Digital Ocean and AWS.

Create A records for both apex and wildcard.

Test it:
```
curl http://lab1.cs260.leesjensen.com/
ssh -i id_rsa root@cs260.leesjensen.com
```

## A1 - Set up hostname cert

Follow instructions for DNS wildcard cert found [here](https://certbot.eff.org/).
Specify the OS and server software.

Note that you can create a wildcard cert, but you have to create an AWS access token that will allow certbot to modify Route53 with the DNS response.

```
sudo snap install core
sudo snap refresh core                         # Snap is automatically installed with Ubuntu 20
sudo snap install --classic certbot            # install certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot  # link so you can run certbot from anywhere
sudo certbot --nginx                           # Provide email and hostname you want the cert for. This automatically configures NGINX
sudo certbot --nginx -d cs260.leesjensen.com   # OR specify the hostname you want the cert for on the command line.
curl https://cs260.leesjensen.com
sudo certbot renew --dry-run                   # Test that auto renew will work
```

Test security with [SSLLabs](https://www.ssllabs.com/)

## Setting up an AWS server on EC2

1. Create or use PEM file
    - Restrict access to the key `chmod 600 production.pem`
1. Set up the security group to allow HTTP and HTTPS traffic
    - Include rules for HTTP, HTTPS, and SSH
1. Launch micro instance with security group and PEM

    ```
    ssh -i production.pem ubuntu@18.221.141.207

    sudo apt-get update
    sudo apt-get install nginx
    service status nginx

    sudo apt-get install curl
    sudo apt-get install jq

    vi /var/www/html/index.nginx-debian.html # Put something nice on the website
    ```

1. Register DNS and test
1. Create the hostname cert

    ```
    sudo snap install core; sudo snap refresh core # Snap is automatically installed with Ubuntu 20
    sudo snap install --classic certbot            # install cerbot
    sudo ln -s /snap/bin/certbot /usr/bin/certbot  # link so you can run cerbot from anywhere
    sudo certbot --nginx -d cs260.leesjensen.com   # OR specify the hostname you want the cert for on the command line.
    curl https://cs260.leesjensen.com
    ```

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

### Submission

1. SSH into your server.
1. Edit `~/vi vim-opinions` and give your opinion
1. Submit some screenshots.


## D6 - HTML

Demonstration index.html file located in html-intro/index.html. This shows many of the most important HTML tags.

### Submission

1. Edit three webpages that link to each other using VI.
1. Demonstrate the basic elements.
1. Host these files on your NGINX webserver `/var/www/html`
1. Submit some screenshots.


## D9 - Configure Web Server (NGINX)

NGINX is installed to `/etc/nginx`. Website data is in `/var/www`.

- **/etc/nginx/sties-available** - the websites NGINX can host.
- **/etc/nginx/sties-enabled** - the websites NGINX is currently hosting.
- **/etc/nginx/sites-available/default** - the default config file. Certbot has added cert and website information along with automatic redirects for HTTP.
- **/var/www/** - Where websites are located. html is the default one, but you can add others

Backup default config

`cp /etc/nginx/sites-available/default /etc/nginx/sites-available/default.bak`

Review syntax of server object

`vi /etc/nginx/sites-available/default`

**Note** - Server section created by certbot

```
sudo certbot --nginx -d lab1.cs260.leesjensen.com
```

### Make change to point to lab

```
mkdir /var/www/lab1.cs260.click
cd /var/www/lab1.cs260.click
printf "<html><body>hello</body></html>" > index.html
vi /etc/nginx/sites-available/default
# Alter server for lab1.cs260.click object to point to new dir
sudo service nginx reload
# Open the browser up and hit the lab1.cs260.click
```

### Submission

1. Screenshot of your of your subdomain hosting content with HTTPS 

## D7 - GIT

**Git Repository** is simply a directory of files with a version history.

1. Make any directory a git repository simply by running `git init`
2. Create a directory and demonstrate everything locally.

**Setup alias as desired**

```
git config --global alias.s status
git config --global alias.l "log --all --graph --decorate --oneline --pretty=format:'%C(bold red)%d%Creset %cr %C(bold yellow)%h%Creset - %C(green)%an%Creset %s'"
```

### Personal Access tokens

The first time you access GitHub from git you will need to provide credentials. 

Set up personal access token from `Settings/Developer Settings/Personal Access Tokens` (https://github.com/settings/tokens).
Here are the [docs](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/creating-a-personal-access-token).

```
$ git push
Username: your_username
Password: your_token
```

### Create your repo on GitHub

Even if you already have one locally you first need to create an empty repo on GitHub and then push your local content up to GitHub.

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

- Clone
- Status
- Add
- Commit
- Log
- Diff
- Conflict resolution
- Fetch and rebase
- merge
- Pull
- Branch


### Submission

1. Create a repository on GitHub called `portfolio`
2. Clone it to your development server
3. Make a `index.html` containing stuff about yourself using only HTML
4. Push it
5. On your production machine clone the repo
6. Copy portfolio to your webserver `/var/www/html/portfolio/index.html`
7. Modify the file and push it back up to GitHub
8. On your development server pull it down
9. Take a screenshot of your portfolio

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


### Submission

1. Pictures of the network tab of the developer tools


## CORS

*Objective*: Keep a website from impersonating another website, or making CSRF attacks.

- **Single Orgin Policy** - Restricts any request that isn't to the same `PROTOCOL://HOST:PORT`
- Origin specified by request must be allowed by the server in the response.
- The browser enforces this.
- Preflight (OPTIONS) to check if origin allowed. Not done if GET, HEAD, or POST, basic headers and content type. Basically always.


