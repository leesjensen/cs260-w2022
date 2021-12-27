# cs260
[BYU CS 260 Canvas Course](https://byu.instructure.com/courses/13246)

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
curl -4 icanhazip.com
curl 104.131.72.225
```

### Set up DNS
I just used my leesjensen.com hostname and created an A record on Route53.

```
curl http://lab1.cs260.leesjensen.com/
```
