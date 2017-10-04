const imagesTest = require('./image-help/index').imagesTest;
imagesTest.run()
    .then(function(reports) {
        console.log(reports);
        reports.forEach(function(report) {
            console.log(report.markdownFileWithImages);
        })
    })
    .catch(function(err) {
        console.log(err.consoleMessage);
        console.log(err.error);
        console.log(err.fileName);
    });