// const browser = window.browser;
const promise = require('bluebird');

function child() {
    browser.driver.navigate().refresh();
    prom();
}

function prom() {
    return browser.executeScript('return document.body.scrollHeight').then((height) => {
        console.log(height);
        browser.driver.sleep(3000);
    }).then(child);
}

function doTest() {
    browser.get('https://www.google.co.jp').then(() => {
        prom();
    });
}

describe('test', () => {
    // while (true) {
    //     doTest();
    // }
    it('capture', (done) => {
        browser.USE_PROMISE_MANAGER = false;
        console.log('test');
        browser.ignoreSynchronization = true;
        doTest();
        console.log('test end');
        done();
    });
});