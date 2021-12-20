const http = require('http');
const webScrapper = require('./web-scrapper.js');

const hostname = 'localhost';
const port = 8000;
const server =  http.createServer(async (req, res) => {
    res.statusCode = 200;
    console.log(req.url);
    let data = 'done';
    if (req.url === '/test') {
         data = await webScrapper.getPageData();
        console.log(data);
    }

    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});
