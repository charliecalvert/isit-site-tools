const ImagesTest = (function() {

    const ImagesList = require('../index').ImagesList;
    const reportMaker = require('../index').reportMaker;
    const createSmallImage = require('../make-markdown/reports/create-small-image');

    function ImagesTest() {
        'use strict';
    }

    ImagesTest.prototype.run = function() {
        return new Promise(function(resolve, reject) {
        const imagesList = new ImagesList();
        imagesList.getImagesList()
            .then(reportMaker)
            .then(createSmallImage.createImages)
            .then(resolve)
            .catch(reject)
        });
    };

    return ImagesTest;

})();

module.exports = new ImagesTest();

