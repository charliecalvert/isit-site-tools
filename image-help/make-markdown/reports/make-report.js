const MakeReport = (function() {

    // const fs = require('fs');
    const path = require('path');
    const createSmallImage = require('./create-small-image');
    const elfLog = require('isit-code-calvert').elfLog('make-report');
    const elfUtils = require('isit-code-calvert').elfUtils;
    const siteUtils = require('../../utilities');
    MakeReport.prototype.extension = ['.JPG', '.jpg'];
    const smallEnding = '-small' + '.jpg';

    function MakeReport() {
        elfLog.setLevel(elfLog.logLevelNano);
        //this.smallEnding = '-small' + this.extension[1];
    }

    function getPathToImage(configSettings, pathToImage) {
        elfLog.details('slicePath pathToImage start: ', pathToImage);
        elfLog.details('slicePath configSettings: ', JSON.stringify(configSettings, null, 4));
        const base = configSettings.baseDir;
        const cloudPath = configSettings.cloudPath;
        pathToImage = pathToImage.slice(base.length, pathToImage.length);
        pathToImage = elfUtils.ensureStartsWithPathSep(pathToImage);
        if (cloudPath.length > 0) {
            pathToImage = cloudPath + pathToImage;
        } else {
            pathToImage = base + pathToImage;
        }
        elfLog.details('slicePathToImage: ', pathToImage);
        return pathToImage;
    }

    function makeMarkDown(configSettings, pathToImage, report) {
        pathToImage = path.normalize(pathToImage);
        pathToImage = getPathToImage(configSettings, pathToImage);
        const smallImage = siteUtils.getSmallName(pathToImage, smallEnding);
        report.markdown += '\n[![' + smallImage + '](' + smallImage + ')](' + pathToImage + ')\n';
        elfLog.nano('SMALL IMAGE', smallImage);
        report.allImages.push(pathToImage);
        report.allImages.push(smallImage);
    }

    MakeReport.prototype.run = function(configSettings, report, imageNames) {
        imageNames.forEach(function(pathToImage) {
            siteUtils.isValidFileName(pathToImage);
            if (!pathToImage.toLowerCase().endsWith(smallEnding)) {
                makeMarkDown(configSettings, pathToImage, report);
                if (configSettings.createSmallImages) {
                    createSmallImage.addToList(report, pathToImage, smallEnding)
                }
            }
        });
        //});
    };

    return MakeReport;

})();

module.exports = new MakeReport();