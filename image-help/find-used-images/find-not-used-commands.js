/**
 * Created by charlie on 3/4/16.
 */

const FindNotUsedCommands = (function() {
    'use strict';

    const path = require('path');
    const elfUtils = require('isit-code-calvert').elfUtils;
    const elfLog = require('isit-code-calvert').elfLog('find-not-used-commands');
    //elfLog.elfName = 'find-not-used-commands';

    function FindNotUsedCommands() {
        //elfLog.minorDetails('FindNotUsed constructor');
    }

    function findNotUsed(settings, allImages, imagesUsed) {
        elfLog.nano("FIND NOT USED CALLED");
        const imagesNotUsed = elfUtils.arrayDifference(allImages, imagesUsed);
        elfLog.emptyLine();
        elfLog.nano('Images Not Used:\n', JSON.stringify(imagesNotUsed, null, 4));
        let commands = '#! /bin/bash\n\n';
        imagesNotUsed.forEach(function(imageName) {
            commands += 'mv "' + path.normalize(imageName) + '" ' + settings.notUsedDir + '/.\n';
        });
        elfLog.nano('COMMANDS', commands);
        return commands;
    }

    FindNotUsedCommands.prototype.getCommands = function(settings, allImages, imagesUsed) {
        elfLog.info('All Images:\n', JSON.stringify(allImages, null, 4));
        elfLog.emptyLine();
        elfLog.minorDetails('Images Used:\n', JSON.stringify(imagesUsed, null, 4));
        return findNotUsed(settings, allImages, imagesUsed);
    };

    return FindNotUsedCommands;
})();

module.exports = new FindNotUsedCommands();
