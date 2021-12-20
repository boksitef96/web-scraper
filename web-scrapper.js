const puppeteer = require('puppeteer');
const chrome = require('chrome-cookies-secure');

async function getPageData() {
    console.log("Web scrapper");

    const browser = await puppeteer.launch({
        headless: false,
    });
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
    //
    // await page.waitForNavigation();
    //
    // const cookies = await page.cookies();
    // console.log(cookies);


    // Skatteverket
    await page.goto('https://skatteverket.se/');
    await page.waitFor(50);
    await page.click('.sso__desktopSection-button-label');
    await page.waitFor(200);
    await page.click('.indexlist:nth-child(2)');
    await page.waitFor(200);
    await page.type('#ssn', '197110238453');
    await page.waitFor(200);
    await page.click(".form-group input[type=submit]");

    // await page.waitForNavigation();

    const cookies = await page.cookies();
    console.log(cookies);

    // await page.waitFor(10000);
    // const cookies = await page.cookies();
    // console.log(cookies);

    browser.close();

    const data = cookies.filter(item => item.name === 'logicaidpSID');
    return data[0] ?? {};
}

async function getCookies(url) {
    await chrome.getCookies(url, 'puppeteer', (err, cookies) => {
        if (err) {
            console.log(err, 'error');
            return;
        }

        console.log(cookies);
    });
}

module.exports = {
    getPageData
}
