// The problem of mixing ES Modules and CommonJS Modules is that
// ES Modules load asynchronously. So we need to wrap them in a
// promise in order to load them in generic JS files. Alternatively
// you can import them into an existing Module or make your JS file
// into a module with the file extension .mjs or <script module>

// This won't work unless it is loaded in a module

//import chalk from 'chalk';
// console.log(chalk.white.bgBlue.underline('   😀 BYU 😀   '));

// You can work around it by doing a dynamic import through a promise

// import('chalk').then((c) => {
//     const chalk = c.default;
//     console.log(chalk.white.bgBlue.underline('   😀 BYU 😀   '));
//   });

const giveMeAJoke = require('give-me-a-joke');
const http = require('http');
const server = http.createServer(function (req, res) {
  giveMeAJoke.getRandomDadJoke((joke) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(`<meta http-equiv="refresh" content="15">`);
    res.write(`<meta charset="UTF-8">`);
    res.write(
      `<style>body {padding:2vh;margin:0;background:#444444;font-family:sans-serif;}</style>`
    );
    res.write(`<style>p {font-size:8vh;color:whitesmoke;}</style>`);
    res.write(`<body><p>${joke}</p></body>`);
    res.end();
  });
});

server.listen(3106, () => {
  console.log(`Serving up the jokes on port 3106`);
});
