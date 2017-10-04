/**
 * Created by charlie on 1/17/16.
 *
 * Use walk-core.js to access this module.
 */

const setupMarked = require('./setup-marked');
const fs = require('fs');
const utils = require('./utils');
const mkdirp = require('mkdirp');
const elfLog = require('isit-code-calvert').elfLog('private-make-page');
elfLog.elfName = 'make-page';

let masterListOfNames = [];
let htmlFilesWritten = [];
let destinationDir;
let masterCallback;

const getFileNamesAsMarkdownList = function(curDir, report) {
    'use strict';
    return report.filter(function(item) {
        return item.root === curDir && item.fileName.indexOf('Summary') === -1;
    }).map(function(item) {
        const fileName = utils.swapExtension(item.fileName, '.html');
        return utils.makeMarkdownLink(fileName);
    }).join('\n');
};

function writeMasterFile(masterFileName, masterListOfNames, callback) {
    'use strict';
    fs.writeFile(masterFileName, masterListOfNames.join('\n'), function(err) {
        if (err) {
            throw (err);
        } else {
            elfLog.details('wrote master file in: ' + masterFileName);
            callback();
        }
    });
}

function getDestinationDir(htmlName, directoryToWalk) {
    'use strict';
    return destinationDir + htmlName.slice(directoryToWalk.length + 1, htmlName.length);
}

function writeHtmlFiles(report, directoryToWalk, highlight, testRun, bootswatch) {
    'use strict';

    report.forEach(function(item) {
        const fileName = item.fileName;
        const fullPath = item.root + '/' + fileName;
        const html = setupMarked.getSingleFile(fileName, fullPath, highlight, testRun, bootswatch);
        let htmlName = utils.swapExtension(fullPath, '.html');
        htmlName = getDestinationDir(htmlName, directoryToWalk);
        elfLog.nano('Writing:' + htmlName, html);
        htmlFilesWritten.push(htmlName);
        fs.writeFile(htmlName, html, function(err) {
            if (err) {
                throw err;
            }
        });
    });
}

makePage.writeMissingSummary = function(directory, details) {
    'use strict';
    console.log('WRITING MISSING SUMMARY', directory);
    fs.writeFile(directory + '/Summary.md', getFileNamesAsMarkdownList(directory, details.report), function(err) {
        if (err) {
            throw (err);
        } else {
            elfLog.log(elfLog.logLevelDetails, 'Writing missing summary in:' + directory);
        }
    });
};

// report, directoryToWalk, directories) {
function writeSummary(curDir, index, details) {
    'use strict';
    const summaryFileName = curDir + '/Summary.md';
    const relativeName = summaryFileName.substr(details.directoryToWalk.length + 1, summaryFileName.length);
    const masterListLineItem = utils.makeMarkdownLink(utils.swapExtension(relativeName, '.html'));

    if (masterListOfNames.indexOf(masterListLineItem) === -1) {
        masterListOfNames.push(masterListLineItem);
    }

    fs.writeFile(summaryFileName, getFileNamesAsMarkdownList(curDir, details.report), function(err) {
        if (err) {
            throw (err);
        } else {
            if (index === details.directories.length - 1) {
                const masterFileName = details.directoryToWalk + '/master-list.md';
                writeMasterFile(masterFileName, masterListOfNames, function() {
                    writeHtmlFiles(details.report, details.directoryToWalk,
                        details.highlight, details.testRun, details.bootswatch);
                    if (masterCallback) {
                        masterCallback(masterListOfNames, htmlFilesWritten);
                    }
                    elfLog.nano('MasterList of Names:' + JSON.stringify(masterListOfNames, null, 4));
                });

            }
        }
    });
}

function makePage() {}

makePage.init = function() {
    'use strict';
    masterListOfNames = [];
    htmlFilesWritten = [];
};

makePage.run = function(curDir, index, details) {
    'use strict';
    destinationDir = details.destinationDir;
    const newDir = getDestinationDir(curDir, details.directoryToWalk);
    mkdirp(newDir, function(err) {
        if (err) {
            console.error(err);
        } else {
            elfLog.nano('Directory confirmed:' + destinationDir);
        }
    });
    masterCallback = details.callback;
    // writeSummary(curDir, index, details.report, details.directoryToWalk, details.directories);
    writeSummary(curDir, index, details);
};

module.exports = makePage;
