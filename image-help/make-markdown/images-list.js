/**
 * Created by charlie on 3/5/16.
 */

const ImagesList = (function() {
    'use strict';

    const createMarkdown = require('./create-markdown');
    const configSettings = require('./misc/config-settings');

    function ImagesList() {
    }

    ImagesList.prototype.getImagesList = function() {
        return new Promise(function(resolve, reject) {

            const selectedConfigObjects = configSettings.getSelectedElvenImageObjects();
            const imagesList = [];
            try {
                selectedConfigObjects.forEach(function(selectedConfigObject) {
                    createMarkdown.buildImagesList(selectedConfigObject, imagesList)
                        .then(function(imagesList) {
                            if (imagesList.length === selectedConfigObjects.length) {
                                resolve(imagesList);
                            }
                        });
                });
            } catch (err) {
                reject(err);
            }
        });
    };

    return ImagesList;

})();

module.exports = ImagesList;
