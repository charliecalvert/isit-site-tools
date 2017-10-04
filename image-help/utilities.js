/**
 * Created by charlie on 3/3/16.
 */

const elfUtils = require('isit-code-calvert').elfUtils;
const path = require('path');
const fs = require('fs');

module.exports = {

    getConfigurationSettings: function(elfConfig, imageConfigName) {
        'use strict';
        throw 'Don\'t call me. Just call elfConfig.get("elvenImages", imageConfigName)';
    },

    getPicturePath: function(base, imageDir) {
        'use strict';
        return path.normalize(base + imageDir);
    },

    isValidFileName: function(fileName) {
        if (fileName.indexOf(' ') !== -1) {
            throw new Error('Spaces in file names not allowed');
        }
    },

    getSmallName: function(pathToImage, smallEnding) {
        const withoutExtension = pathToImage.replace(/\.[^/.]+$/, '');
        return withoutExtension + smallEnding;
    },

    writeMarkdownFileWithImages: function(fileName, content) {
        const dir = path.dirname(fileName);
        elfUtils.ensureDir(dir);
        fs.writeFileSync(fileName, content);
        return content;
    }

};
