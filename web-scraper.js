const puppeteer = require('puppeteer');
const logger = require('./logger.js');
const {chromium} = require('playwright');

async function getBrowser() {
    // let options = {}

    // if (process.env.NODE_ENV === "production") {
    //     options = {
    //         ignoreDefaultArgs: ['--disable-extensions'],
    //         // executablePath: '/usr/bin/chromium-browser',
    //         // executablePath: __dirname.replace('app.asar', 'node_modules/puppeteer/.local-chromium/win64-818858/chrome-win/chrome.exe'),
    //         // args: ['--no-sandbox' ,'--disable-setuid-sandbox',  '--use-gl=egl'],
    //         args: ['--no-sandbox']
    //     }
    // }

    const options = {
        // headless: false,
        headless: true,
        defaultViewport: null,
        // ignoreDefaultArgs: ['--disable-extensions'],
        // args: ['--no-sandbox'],
        // executablePath: __dirname + '/pw-browsers/'
        // executablePath: __dirname.replace('app.asar', 'node_modules/puppeteer/.local-chromium/win64-818858/chrome-win/chrome.exe'),
    };

    return await puppeteer.launch(options)
}

async function getPageData({fullAuthentication, pno}) {
    logger.info("Web scrapper START");
    // const browser = await getBrowser();
    //
    // const page = await browser.newPage();

    const dir = '/var/www/web-scraper/pw-browsers';
    // const dir = '/Users/bokistef/Documents/Projects/web-scraper/web-scraper/node_modules/playwright/node_modules/playwright-core/.local-browsers/chromium-939194/chrome-mac/Chromium.app';
    console.log(dir);
    const options = {
        // headless: false,
        headless: true,
        defaultViewport: null,
        ignoreDefaultArgs: ['--disable-extensions'],
        args: ['--no-sandbox'],
        executablePath: dir
    };

    const browser = await chromium.launch(options);
    console.log(browser);
    // const page = await browser.newPage();
    const context = await browser.newContext()
    const page = await context.newPage()

    // // FACEBOOK
    // await page.goto('https://facebook.com/');
    // await typeElement(page, '#email', 'bokistef96@gmail.com');
    // await typeElement(page, '#pass', 'wearecodeus');
    // await clickElement(page, 'button[type="submit"]')
    // await page.waitForTimeout(10000);

    // EUPRAVA
    await page.goto('https://euprava.gov.rs/');

    await page.waitForTimeout(200);
    await clickElement(page, '.my-egov');
    await clickElement(page, '.my-egov li');
    await clickElement(page, '.icon-mobile');
    await typeElement(page, '#usernameCid', 'bokistef96@gmail.com');
    await clickElement(page, '#aetButtonCID');

    await page.waitForNavigation({timeout: 20000});
    await page.waitForTimeout(3000);

    // Skatteverket
    // await page.goto('https://sso.skatteverket.se/ms/ms_web/etjanst.do?etjanstId=etjanst.flyttanmalan');

    // await clickElement(page, '.sso__desktopSection-button-label');
    // await clickElement(page, '.indexlist:nth-child(2)');
    // await typeElement(page, '#ssn', pno);
    //
    // await clickElement(page, '.form-group input[type=submit]');
    //
    // if (fullAuthentication) {
    //     await page.waitForSelector("#home-top-section", {
    //         timeout: 5000,
    //     });
    //     // await page.waitForNavigation({timeout: 20000});
    //     await page.waitForTimeout(3000);
    // }

    await page.waitForTimeout(5000);

    const cookies = await context.cookies();
    const data = cookies.map(item => item.name);
    console.log(data);
    browser.close();

    logger.info("Web scrapper DONE BROWSER");

    // const data = cookies.filter(item => item.name === 'logicaidpSID');
    // return data[0] ?? {};
    return data;
}


async function clickElement(page, selector) {
    await page.waitForTimeout(500);
    await page.waitForSelector(selector, {
        timeout: 2000,
    });
    await page.click(selector);
}

async function typeElement(page, selector, text) {
    await page.waitForTimeout(500);
    await page.waitForSelector(selector, {
        timeout: 2000,
    });
    await page.type(selector, text);
}

module.exports = {
    getPageData
}
