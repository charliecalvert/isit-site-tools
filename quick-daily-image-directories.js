/**
 * Created by charlie on 7/8/16.
 */

const elfConfig = require('isit-code-calvert').elfConfig;
const createDirectories = require('./image-help/create-directories/create-directories');
const configurationSettings = require('./image-help/make-markdown/misc/config-settings');

function copyFilesIntoDirectories() {
    'use strict';
    elfConfig.useLocalConfig = true;
    elfConfig.load(function() {
        const california = configurationSettings.getSelectedElvenImage('Ohio-2016-08-05');
        createDirectories.run(california, function() {
            console.log('AllDone');
        });
    });
}

copyFilesIntoDirectories();
