const webScrapper = require('./web-scraper.js');
const logger = require('./logger.js');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.post('/data', async (req, res) => {
    let data = 'Done!';

    try {
        data = await webScrapper.getPageData(req.body);
        logger.info(data);
    } catch (error) {
        logger.error("ERROR:");
        logger.error(error.message);
        res.end("Error");
    }
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(data));
});

const PORT = process.env.PORT || 8000;
app.listen(PORT);
