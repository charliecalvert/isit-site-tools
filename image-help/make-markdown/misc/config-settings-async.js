/**
 * Created by charlie on 7/21/16.
 */

const elfConfig = require('isit-code-calvert').elfConfig;
const elfUtils = require('isit-code-calvert').elfUtils;
// const elfLog = require('isit-code-calvert').elfLog('config-settings');
elfConfig.useLocalConfig = true;

function ConfigSettings() {
    'use strict';
}

function ensureConfigFileLoaded(callback) {
    elfConfig.loadAsync().then(function() {
        callback();
    });
}

ConfigSettings.prototype.setSelectedElvenImages = function(selectedElvenImages) {

    return new Promise(function(resolve) {
        ensureConfigFileLoaded(function() {
          elfConfig.set(selectedElvenImages, 'selectedElvenImages');
          elfConfig.saveAsync()
          .then(function(result) {
              resolve(result);
          }).catch(function(err) {
              console.log(err);
          });
        })
    });
};

ConfigSettings.prototype.getSelectedElvenImages = function() {
    'use strict';
    return new Promise(function(resolve) {
        ensureConfigFileLoaded(function() {
            let selectedImageConfigName = elfConfig.get('selectedElvenImages');
            if (typeof selectedImageConfigName === 'undefined') {
                throw 'In ElvenConfig.json you must define the define the selected elvenImage class.\n' +
                'For instance:\n\n "elvenImages": {\n    "selected": "california",\n' +
                '    "california: {...}\n    "spain": {...}\n }';
            }
            if (typeof selectedImageConfigName === 'string') {
                const tempArray = [];
                tempArray.push(selectedImageConfigName);
                selectedImageConfigName = tempArray;
            }

            resolve(selectedImageConfigName);
        });
    });
};

ConfigSettings.prototype.getElvenImages = function() {
    'use strict';
    return elfConfig.getElvenImages();
};

const getOutPutDirectory = function() {
    return elfUtils.ensureEndsWithPathSep(elfUtils.getHomeDir()) +
        elfUtils.ensureEndsWithPathSep('ElvenImages');
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
