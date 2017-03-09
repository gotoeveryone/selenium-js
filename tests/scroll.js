const {webdriver, promise, Builder, By, until} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('chromedriver').path;

const service = new chrome.ServiceBuilder(path).build();
chrome.setDefaultService(service);

// ドライバ生成
const driver = new Builder()
    .forBrowser('chrome')
    .setChromeOptions(new chrome.Options().setChromeBinaryPath(process.argv[2]))
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

// URL取得
const url = process.argv[3];
let scrollTop = 0;

driver.get(url).then(() => {
    (function loop() {
        return driver.executeScript('return document.body.scrollHeight;').then((height) => {
            return driver.executeScript('return window.innerHeight;').then((inner) => {
                const bottom = scrollTop + inner;
                if (bottom < height) {
                    console.log('scrollTop: ' + scrollTop);
                    console.log('scrollBottom: ' + bottom);
                    console.log('height: ' + height);
                    // 今の高さを算出
                    scrollTop = bottom;
                    return driver.executeScript(`window.scrollTo(0, ${scrollTop});`);
                }
                return promise.fullyResolved(0);
            });
        }).then(loop);
    })();
    // debugger;
}).then(_ => driver.quit());
