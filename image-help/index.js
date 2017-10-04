/**
 * Created by charlie on 3/6/16.
 *
 * Export the various commands you can use.
 */

const getImagesUsed = require('./find-used-images/get-images-used');
const findNotUsedCommands = require('./find-used-images/find-not-used-commands');
const getNotUsed = require('./find-used-images/get-not-used');
const configSettings = require('./make-markdown/misc/config-settings');
const createDirectories = require('./create-directories/create-directories');

module.exports.MakeMarkdown = require('./make-markdown/index').MakeMarkdown;
module.exports.reportMaker = require('./make-markdown/index').reportMaker;
module.exports.reportChecker = require('../image-help/make-markdown/reports/report-checker');
module.exports.ImagesList = require('./make-markdown/images-list');
module.exports.deleteMarkdown = require('./make-markdown/delete-markdown');
/*{
    deleteMarkdownFileWithImages: makeMarkdown.deleteMarkdownFileWithImages,
    findDuplicateKeys: findDuplicateKeys,
    getImagesList: makeMarkdown.getImagesList
};*/

module.exports.configSettings = {
    getSelectedElvenImage: configSettings.getSelectedElvenImage,
    //loadConfigFile: configSettings.loadConfigFile,
    getElvenImages: configSettings.getElvenImages,
    getSelectedElvenImages: configSettings.getSelectedElvenImages,
    setSelectedElvenImages: configSettings.setSelectedElvenImages
};

// TESTS


module.exports.imagesUsed = {
    findMatches: getImagesUsed.findMatches,
    imagesUsedList: getImagesUsed.imagesUsed
};


module.exports.findUsedImages = {
    getCommands: findNotUsedCommands.getCommands
};

module.exports.getNotUsed = {
    loadConfig: getNotUsed.loadConfig
};

module.exports.createDirectories = {
    getPicturePath: createDirectories.getPicturePath,
    run: createDirectories.run
};

module.exports.imagesTest = require('./runners/ImagesTest');