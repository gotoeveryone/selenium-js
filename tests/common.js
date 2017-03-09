const fs = require('fs');

module.exports = {
    writeScreenshot: function(data, name) {
        fs.mkdir('./pictures/', () => {
            fs.writeFile(`./pictures/${name}.png`, data, 'base64');
        });
    }
};
