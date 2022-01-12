# Activity N2.6 Cities

Using code built with the express generator and a vue application that doesn't use templates (and thus doesn't need transpiling with Babel) we create a simple service for looking up cities from a file.

In this activity you will implement the Utah cities suggestions RESTful service in Node.js that connects to your cities application from ["Activity V0: Vue with a REST Interface"](https://github.com/BYUCS260/Vue-REST).
You will take a URL with a ?q=chars suffix and will look up all of the utah cities that have those chars as a prefix. You will then return a JSON string corresponding to the entries.

If you haven't seen the express generated files before, check out this [documentation](https://expressjs.com/en/starter/generator.html).

The javascript application from ["Activity V0: Vue with a REST Interface "](https://github.com/BYUCS260/Vue-REST) should be modified to make the request to your own REST server instead of the <a href="http://bioresearch.byu.edu/cs260/jquery/getcity.cgi?q=P">one used</a> for your javascript activity.
Before you do that, you should copy the related files over to your newly created express server.

These [hints](https://github.com/BYUCS260/Lab4-NodeREST/wiki/Cities-REST-Service-Hints) may be helpful if you get stuck.
