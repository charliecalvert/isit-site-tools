const CreateSmallImage = (function() {
    const sharp = require('sharp');
    //const elfUtils = require('isit-code-calvert').elfUtils;
    const siteUtils = require('../../utilities');
    const elfLog = require('isit-code-calvert').elfLog('make-report');
    // const dateDir = '';

    function CreateSmallImage() {
        elfLog.setLevel(elfLog.logLevelNano);
        // dateDir = elfUtils.createDateDir();
    }

    const createImage = function(pathToImage, smallImage) {
        return new Promise(function(resolve) {
            sharp(pathToImage)
                .resize(816, 459)
                .toFile(smallImage)
                .then(function(abc) {
                    // Without timeout I get
                    //    assertion 'hash_table != NULL
                    setTimeout(function() {
                        abc.pathToImage = pathToImage;
                        abc.smallImage = smallImage;
                        resolve(abc);
                    }, 250);
                })
                .catch(function() {
                    throw new Error('SHARP BLEW UP');
                });
        });
    };

    CreateSmallImage.prototype.createImages = function(report) {
        return new Promise(function(resolve, reject) {
            report[0].smallImages.forEach(function(image) {
                    //console.log('creating image');
                    createImage(image.pathToImage, image.smallImage)
                        .then(function(abc) {
                            resolve(report)
                        })
                        .catch(reject);

            });
        });
    };

    CreateSmallImage.prototype.addToList = function(report, pathToImage, smallEnding) {
        elfLog.nano('CREATE SMALL IMAGE');
        const smallImage = siteUtils.getSmallName(pathToImage, smallEnding);
        elfLog.details("Creating image:", smallImage);
        report.smallImages.push({
            pathToImage: pathToImage,
            smallImage: smallImage
        });
    };

    return CreateSmallImage;

})();

module.exports = new CreateSmallImage();