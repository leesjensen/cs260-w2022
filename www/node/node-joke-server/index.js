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
