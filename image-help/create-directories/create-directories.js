/**
 * Created by charlie on 7/7/16.
 */

const utilities = require('../utilities');
const walker = require('isit-code-calvert').walker;
const elfLog = require('isit-code-calvert').elfLog('create-directories');
const elfUtils = require('isit-code-calvert').elfUtils;
const mkdirp = require('mkdirp');
const fs = require('fs');

function createDirectories() {

}

function makeDir(newDir, callback) {
    'use strict';
    elfLog.nano("NEW DIR:", newDir);
    mkdirp(newDir, function(err) {
        if (err) {
            throw err;
        }
        callback();
    });
}

function copyFile(source, target, callback) {
    'use strict';
    let cbCalled = false;

    const rd = fs.createReadStream(source);
    rd.on('error', function(err) {
        done(err);
    });
    const wr = fs.createWriteStream(target);
    wr.on('error', function(err) {
        done(err);
    });
    wr.on('close', function() {
        done();
    });
    rd.pipe(wr);

    function done(err) {
        if (!cbCalled) {
            callback(err);
            cbCalled = true;
        }
    }
}

function copyFiles(picturePath, filesToCopy, callback) {
    'use strict';

    let numCopied = 0;
    filesToCopy.forEach(function(file) {
        copyFile(file.copyFrom, file.copyTo, function(err) {
            if (err) {
                throw err;
            }
            numCopied += 1;

            if (numCopied === filesToCopy.length) {
                elfLog.details('Copied: ' + numCopied, file.copyFrom, file.copyTo);
                callback();
            }
        });
    });
}

createDirectories.getPicturePath = function(configSettings) {
    let picturePath = utilities.getPicturePath(configSettings.baseDir, configSettings.imageDir);
    picturePath = elfUtils.ensureEndsWithPathSep(picturePath);
    if (elfUtils.directoryExists(picturePath)) {
        return picturePath;
    } else {
        // throw "Directory does not exist:" + picturePath;
        return elfUtils.ensureDir(picturePath);
    }
};

createDirectories.run = function(configSettings, callback) {
    'use strict';
    const picturePath = this.getPicturePath(configSettings);

    const extension = ['.JPG', '.jpg'];
    walker.walkDirs(picturePath, extension, function(fileReport) {
        const dirs = [];
        const filesToCopy = [];
        let dirsTotal = 0;
        let dirsCopied = 0;

        fileReport.forEach(function(pathToImage) {
            const name = pathToImage.fileStats.name;
            const dateDir = name.substring(0, 8);
            const newDir = elfUtils.ensureEndsWithPathSep(picturePath + dateDir);
            filesToCopy.push({
                copyFrom: elfUtils.ensureEndsWithPathSep(picturePath) + name,
                copyTo: newDir + name
            });
            if (dirs.indexOf(dateDir) === -1) {
                dirsTotal += 1;
                dirs.push(dateDir);
                makeDir(newDir, function() {
                    dirsCopied += 1;
                    //console.log('Dirs Created', dirsCopied, dirsTotal);
                    if (dirsTotal === dirsCopied) {
                        copyFiles(picturePath, filesToCopy, callback);
                    }
                });
            }

        });
    });
};

module.exports = createDirectories;
