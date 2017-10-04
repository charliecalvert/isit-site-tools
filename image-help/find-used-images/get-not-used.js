/**
 * Created by charlie on 3/4/16.
 */

const ImagesNotUsed = (function() {
    'use strict';

    const fs = require('fs');
    const elfConfig = require('isit-code-calvert').elfConfig;
    const elfLog = require('isit-code-calvert').elfLog('get-not-used');
    const mkdirp = require('mkdirp');
    const utils = require('../utilities');
    const getImagesUsed = require('./get-images-used');
    const findNotUsedCommands = require('./find-not-used-commands');
    const configSettings = require('../make-markdown/misc/config-settings');
    let base = '/var/www/html/';

    function ImagesNotUsed() {
        elfLog.setLevel(elfLog.logLevelMinorDetails);
    }

    function writeNotUsed(fileName, notUsedDir, runReport, callback) {
        mkdirp(notUsedDir, function(err) {
            if (err) {
                console.error(err);
            } else {
                elfLog.log(elfLog.logLevelDetails, 'Directory confirmed:' + notUsedDir);
                fs.writeFile('moveNotUsed-' + fileName + '.sh', runReport.commands, function(err) {
                    if (err) {
                        throw err;
                    }
                    elfLog.log(elfLog.logLevelInfo, 'Wrote moveNotUsed.sh');
                    callback(runReport);
                });
            }
        });
    }

    function createMoveCommands(settings, callback) {
        fs.readFile(settings.allImagesJsonFile, 'utf8', function(err, allImagesAsString) {
            //const findNotUsedCommands = new FindNotUsedCommands(base);
            const allImages = JSON.parse(allImagesAsString);
            const commands = findNotUsedCommands.getCommands(settings, allImages, getImagesUsed.imagesUsed);
            elfLog.nano("GET NOT COMMANDS:", commands);
            const runReport = {
                commands: commands,
                allImages: allImages,
                imagesUsed: getImagesUsed.imagesUsed
            };
            elfLog.info("GET NOT REPORT", JSON.stringify(settings, null, 4));
            writeNotUsed(settings.name, settings.notUsedDir, runReport, callback);
        });
    }

    function processNotUsed(settings, callback) {
        fs.readFile(settings.markdownFileWithImages, 'utf8', function(err, result) {

            const lines = result.split('\n');

            for (let i = 0; i < lines.length; i++) {
                elfLog.nano("WRITE NOT USED", lines[i]);
                getImagesUsed.findMatches(lines[i]);
            }
            createMoveCommands(settings, callback);
        });
    }

    ImagesNotUsed.prototype.loadConfig = function(callback) {
        elfConfig.useLocalConfig = true;
        const runThem = function(settings) {
            base = settings.base;
            elfLog.details(elfLog.logLevelMinorDetails, base + ' ' +
                settings.markdownFileWithImages + ' ' +
                settings.allImagesJsonFile + ' ' +
                settings.notUsedDir);
            processNotUsed(settings, callback);
        };
        elfConfig.load(function() {
            const names = configSettings.getSelectedElvenImages();
            elfLog.nano("NAMES SET", names);
            names.forEach(function(name) {
                const settings = configSettings.getSelectedElvenImage(name);
                runThem(settings);
            });
        });
    };

    return ImagesNotUsed;
})();

module.exports = new ImagesNotUsed();
