/**
 * Created by charlie on 7/27/16.
 */

const CheckMarkdown = (function() {
    'use strict';

    const configSettings = require('./config-settings');
    const elfConfig = require('isit-code-calvert').elfConfig;
    //const PythonShell = require('python-shell');
    const findDuplicateKeys = require('./find-duplicate-keys');
    //const elfLog = require('isit-code-calvert').elfLog('check-markdown');

    function checkMarkdown() {
        'use strict';
    }

    checkMarkdown.checkSelectedObjectNames = function(callback) {
        const objectNames = configSettings.getSelectedElvenImages();
        callback(objectNames);
    };

    checkMarkdown.findDuplicateKeys = function (callback) {
        findDuplicateKeys(callback);
    };

    checkMarkdown.check = function(callback) {
        const elvenImages = elfConfig.getElvenImages();
        let result = true;

        function checkForProperty(selectedObject, key, propertyName) {
            const property = selectedObject[propertyName];
            if (typeof property === 'undefined') {
                console.log(key + ' does not have property: ' + propertyName);
                result = false;
            }
        }

        const propertiesGood = ['name', 'baseDir', 'cloudPath', 'createSmallImages'];

        elvenImages.forEach(function(elvenImage) {
            const name = elvenImage.name;
            checkForProperty(elvenImage, name, propertiesGood[0]);
            checkForProperty(elvenImage, name, propertiesGood[1]);
            checkForProperty(elvenImage, name, propertiesGood[2]);
            checkForProperty(elvenImage, name, propertiesGood[3]);
        });

        callback(result);

    };

    checkMarkdown.checkDerived = function(callback) {
        elfConfig.forceReload();
        const elvenImages = elfConfig.getElvenImages();
        let result = true;

        // We can derive these properties, so don't put them
        // in the config file. I used to do this, so now I
        // have to check that we are not using an old config file.
        function checkForDerivedProperty(selectedObject, key, propertyName) {
            const property = selectedObject[propertyName];
            if (typeof property !== 'undefined') {
                console.log(key + ' has bad property: ' + propertyName);
                result = false;
            }
        }

        const propertiesDerived = ['imageDir', 'markdownFileWithImages', 'allImagesJsonFile', 'notUsedDir'];

        elvenImages.forEach(function(elvenImage) {
            const name = elvenImage.name;
            checkForDerivedProperty(elvenImage, name, propertiesDerived[0]);
            checkForDerivedProperty(elvenImage, name, propertiesDerived[1]);
            checkForDerivedProperty(elvenImage, name, propertiesDerived[2]);
            checkForDerivedProperty(elvenImage, name, propertiesDerived[3]);
        });

        callback(result);

    };

    return checkMarkdown;

})();

module.exports = CheckMarkdown;
