/**
 * Created by charlie on 7/21/16.
 */

const elfConfig = require('isit-code-calvert').elfConfig;
elfConfig.useLocalConfig = true;
const elfUtils = require('isit-code-calvert').elfUtils;
const ElfSelectedErrorObject = require('./ElfSelectedObjectError');
// const elfLog = require('isit-code-calvert').elfLog('config-settings');

function ConfigSettings() {
    'use strict';
}

function clearDerivedProperties() {
    const elvenImages = elfConfig.getElvenImages();
    elvenImages.forEach(function(elvenImage) {
        if (elvenImage.imageDir) {
            delete elvenImage.imageDir;
            delete elvenImage.markdownFileWithImages;
            delete elvenImage.allImagesJsonFile;
            delete elvenImage.notUsedDir;
        }
    });
}

ConfigSettings.prototype.setSelectedElvenImages = function(selectedElvenImages) {
    elfConfig.load();
    elfConfig.set(selectedElvenImages, 'selectedElvenImages');
    clearDerivedProperties();
    elfConfig.save();
    return true;
};

ConfigSettings.prototype.getSelectedElvenImages = function() {
    'use strict';
    elfConfig.load();
    let selectedImageConfigName = elfConfig.get('selectedElvenImages');
    if (typeof selectedImageConfigName === 'undefined') {
        throw new ElfSelectedErrorObject();
    }
    if (typeof selectedImageConfigName === 'string') {
        const tempArray = [];
        tempArray.push(selectedImageConfigName);
        selectedImageConfigName = tempArray;
    }
    return selectedImageConfigName;
};

ConfigSettings.prototype.getSelectedElvenImage = function(selectedObjectName) {
    'use strict';
    const elvenHome = getOutPutDirectory();
    const elvenImages = elfConfig.getElvenImages();
    for (let i = 0; i < elvenImages.length; i++) {
        const elvenImage = elvenImages[i];
        if (elvenImage.name === selectedObjectName) {
            //console.log(elvenImage.name, selectedObjectName);
            elvenImage.imageDir = '/' + elvenImage.name;
            elvenImage.markdownFileWithImages = elvenHome + elvenImage.name + '.md';
            elvenImage.allImagesJsonFile = elvenHome + 'all-images-' + elvenImage.name + '.json';
            elvenImage.notUsedDir = elfUtils.ensureEndsWithPathSep(elvenHome) + 'not-used/' + elvenImage.name;

            return elvenImage;
        }
    }
    throw 'Could not find ' + selectedObjectName + ' in ElvenImages';
};

ConfigSettings.prototype.getSelectedElvenImageObjects = function() {
    const selectedConfigObjects = [];
    const objectNames = this.getSelectedElvenImages();
    const that = this;
    objectNames.forEach(function(objectName) {
        const selectedConfigObject = that.getSelectedElvenImage(objectName);
        selectedConfigObjects.push(selectedConfigObject);
    });
    return selectedConfigObjects;
};

ConfigSettings.prototype.getElvenImages = function() {
    'use strict';
    return elfConfig.getElvenImages();
};

const getOutPutDirectory = function() {
    return elfUtils.ensureEndsWithPathSep(elfUtils.getHomeDir()) +
        elfUtils.ensureEndsWithPathSep('ElvenImages');
};

ConfigSettings.prototype.getPropertyNamesAsArray = function() {
    'use strict';
    return elfConfig.getPropertyNamesAsArray('elvenImages');
};

/*
ConfigSettings.prototype.loadConfigFile = function(callback) {
    'use strict';
    elfConfig.load(callback);
};
*/

module.exports = new ConfigSettings();
