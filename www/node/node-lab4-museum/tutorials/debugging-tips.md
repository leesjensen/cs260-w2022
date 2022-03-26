Here are some tips and common errors for lab 4. These do not replace the tutorials.

**Front end**

 * File overview in front-end/src
   * main.js -- global data structures 
   * App.vue -- code that goes on all your pages, like a menu or a footer
   * router/index.js -- configure which view to use for each URL
   * views/Home.vue -- view/component for the home page. Shows the images uploaded to gallery. It is blank when there is nothing uploaded
   * views/Admin.vue -- view/component for the admin page. Will allow the admin to add, edit, and delete images from the gallery
 
**Back end**

 * If you are getting a 404 error for one of your backend calls check that the server is started, vue.config.js is correct and then that the endpoint is set up properly and matches the front-end call including the "/".

 * This site has the operations you can perform on a mongoose.Schema items. In this lab we use findOne() deleteOne() and find(). https://mongoosejs.com/docs/queries.html. 

 * Make sure to do item.save() anytime you edit or create a new item.

**Console statements**

 * Console statements and errors in the front end will print to the browser console as normal.  For the back end they will show up in the terminal where the server is running.  To do "npm run build" the console statements will all need to be commented out or removed.

**Clearing the database**

 * If you are getting an error of "cannot read property { method } of undefined"  one possibility is incomplete data in the database.  A item may have an undefined property as we are building the website and adding to it.  You can use debugging and console.log() statement to find if this is the case.

 * To clear your mongo database you can use the mongoDB compass application or the command line.  If you have the compass application paste the mongo link in the starting field.  It will look something like this - "mongodb://localhost:27017/museum".  You can then click on the proper name and collection and edit or delete each item individually.  On the command line you can use the mongo shell. This tutorial gives the commands you can use. https://docs.mongodb.com/manual/tutorial/remove-documents/. 

**Digital Ocean**

* If you are getting an address already in use error on this or any other node projects it means you will need to close that port or switch to a new one.  Keep in mind the port needs to stay open at least until the assignment is graded. Use "forever list" to figure out what is being used and "forever stop {index}" to stop it.

* When moving to digital ocean or changing a port number check these files for the correct port numbers and paths: vue.config.js, /etc/nginx/sites-available/lab4.domainname.com,  and server.js( and other backend js files) for app.listen() and multer destination path. Reload nginx after all of these locations are checked "sudo nginx -s reload".
