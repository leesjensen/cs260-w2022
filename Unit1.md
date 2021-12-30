# Unit 1

## Rent Digital Ocean server

- Go to [Digital Ocean](https://www.digitalocean.com/)
- Start 60 free trial
- Rent basic droplet. Make sure you pick **Regular Intel $5 flavor**.

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

I just used my leesjensen.com hostname and created an A record on Route53 for \*.cs260.leesjensen.com and cs260.leesjensen.com.

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

## NGINX

NGINX is installed to `/etc/nginx`. Website data is in `/var/www`.

- **/etc/nginx/sties-available** - the websites NGINX can host.
- **/etc/nginx/sties-enabled** - the websites NGINX is currently hosting.
- **/etc/nginx/sites-available/default** - the default config file. Certbot has added cert and website information along with automatic redirects for HTTP.
- **/var/www/** - Where websites are located. html is the default one, but you can add others

Create index.html in `/var/www/html directory`

Modify `/etc/nginx/sites-available/default` to point to different locations by specifying reverse proxy functionality in the `server` objects.

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

## VIM

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

## HTTP

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

## HTML

Demonstration index.html file located in html-intro/index.html. This shows many of the most important HTML tags.

## GIT

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

Even if you already have one locally you need to either start from GitHub, or create an empty one on GitHub and then push your local content up to GitHub.

You can create your repo locally and push it up to git.

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

However it is probably easier to just populate the GitHub repo with the default README.md and .gitignore, and then just clone it.

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

## CSS

- **Topography** - [Great guidlines](https://www.internetingishard.com/html-and-css/web-typography/)
