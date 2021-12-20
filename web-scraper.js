const puppeteer = require('puppeteer');
const logger = require('./logger.js');

async function getBrowser() {
    let options = {}

    if (process.env.NODE_ENV === "production") {
        options = {
            ignoreDefaultArgs: ['--disable-extensions'],
            // executablePath: '/usr/bin/chromium-browser',
            // executablePath: __dirname.replace('app.asar', 'node_modules/puppeteer/.local-chromium/win64-818858/chrome-win/chrome.exe'),
            // args: ['--no-sandbox' ,'--disable-setuid-sandbox',  '--use-gl=egl'],
            args: ['--no-sandbox']
        }
    }

    return await puppeteer.launch({headless: true, defaultViewport: null, ...options})
}

async function getPageData({fullAuthentication, pno}) {
    logger.info("Web scrapper START");
    const browser = await getBrowser();

    const page = await browser.newPage();

    // EUPRAVA
    // await page.goto('https://euprava.gov.rs/');
    // await page.waitFor(50);
    // await page.click('.my-egov');
    // await page.waitFor(50);
    // await page.click('.my-egov li');
    // await page.waitFor(50);
    // await page.click('.icon-mobile');
    // await page.waitFor(50);
    // await page.type('#usernameCid', 'bokistef96@gmail.com');
    // await page.click('#aetButtonCID');

    // await page.waitForNavigation();

    // const cookies = await page.cookies();
    // console.log(cookies);

    // // Skatteverket
    await page.goto('https://skatteverket.se/');
    await page.waitFor(300);
    await page.click('.sso__desktopSection-button-label');
    await page.waitFor(300);
    await page.click('.indexlist:nth-child(2)');
    await page.waitFor(300);
    await page.type('#ssn', pno);
    await page.waitFor(300);
    await page.click(".form-group input[type=submit]");

    if (fullAuthentication) {
        await page.waitForNavigation({timeout: 20000});
    }

    const cookies = await page.cookies();

    browser.close();

    logger.info("Web scrapper DONE BROWSER");

    // const data = cookies.filter(item => item.name === 'logicaidpSID');
    // return data[0] ?? {};
    return cookies;
}

module.exports = {
    getPageData
}
