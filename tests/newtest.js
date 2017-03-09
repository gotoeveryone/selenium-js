const {webdriver, promise, Builder, By, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('chromedriver').path;

const service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().setChromeBinaryPath('chrome path'))
    .build();

// let cnt = 0;
// try {
//     driver.get('http://www.google.com/ncr').then(() => {
//         (function loop() {
//             console.log('loop, ' + cnt);
//             driver.navigate().refresh();
//             cnt++;
//             return driver.get('http://www.google.com/ncr').then(loop);
//         })();
//         // debugger;
//     });
// } finally {
//     driver.quit();
// }

const url = 'https://local.kazukisv.com/igo/';
let scrollTop = 0;

driver.get(url).then(() => {
    (function loop() {
        console.log('GO!');
        return driver.executeScript('return document.body.scrollTop;').then((top) => {
            return driver.executeScript('return document.body.scrollHeight;').then((height) => {
                return driver.executeScript('return window.innerHeight;').then((inner) => {
                    if ((scrollTop + inner) < height) {
                        // 今の高さを算出
                        scrollTop = inner;
                        console.log('top: ' + scrollTop);
                        console.log('innerheight: ' + inner);
                        console.log('height: ' + height);
                        const s = `window.scrollTo(0, ${scrollTop});`;
                        return driver.executeScript(s);
                    }
                    return promise.fullyResolved(0);
                });
            });
        }).then(loop);
    })();
    // debugger;
}).then(_ => driver.quit());
