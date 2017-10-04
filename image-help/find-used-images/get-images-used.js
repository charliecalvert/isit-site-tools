/**
 * Created by charlie on 3/4/16.
 */

module.exports = (function() {
    'use strict';

    const elfLog = require('isit-code-calvert').elfLog('get-images-used');
    let that;

    function GetImagesUsed() {
        elfLog.setLevel(elfLog.logLevelNano);
        elfLog.nano('GetImagesUsed constructor called');
        that = this;
    }

    GetImagesUsed.prototype.imagesUsed = [];

    function arrayContains(needle, haystack) {
        elfLog.nano('GetImagesUsed arrayContains called');
        return (haystack.indexOf(needle) > -1);
    }

    function pushImageUsed(needle) {
        elfLog.nano('GetImagesUsed pushImageUsed called');
        if (!arrayContains(needle, that.imagesUsed)) {
            that.imagesUsed.push(needle);
        }
    }

    /******************
     * PUBLIC METHODS *
     ******************/

    GetImagesUsed.prototype.showImagesUsed = function() {
        console.log('== Images Used =======================');

        this.imagesUsed.forEach(function(image) {
            elfLog.minorDetails(image);
        });

        console.log('======================================');
    };

    GetImagesUsed.prototype.findMatches = function(line) {
        elfLog.nano('GetImagesUsed findMatches called');
        const matches = line.match(/\[\!\[([^\]]*)\]\(([^\)]*)\)\]\(([^\)]*)\)/);

        if (matches !== null) {
            for (let i = 1; i < 4; i++) {
                pushImageUsed(matches[i]);
            }
        }
    };

    return new GetImagesUsed();
})();
