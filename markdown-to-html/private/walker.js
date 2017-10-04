/**
 * Created by charlie on 9/12/2015.
 *
 * Use walk-core.js to access this module.
 */

const walk = require('walk');
const fs = require('fs');
const path = require('path');
const makePage = require('./make-page');
const elfLog = require('isit-code-calvert').elfLog('private-walker');
const moment = require('moment');

function walker() {
    'use strict';
    elfLog.setLevel(elfLog.logLevelInfo);
}

walker.fileReport = [];

walker.options = {
    followLinks: false,
    // directories with these keys will be skipped
    filters: ['Temp', '_Temp']
};

function testExtension(extensionFilter, fileExtension) {
    'use strict';
    if (typeof extensionFilter === 'string') {
        return extensionFilter === fileExtension;
    } else {
        return elfUtils.arrayContains(extensionFilter, fileExtension);
    }
}

walker.walkDirs = function(directoryToWalk, extensionFilter, mostRecentDate, callback) {
    'use strict';
    elfLog.nano('walker.walkDirs called');
    const walkInstance = walk.walk(directoryToWalk, walker.options);

    walkInstance.on('file', function(root, fileStats, next) {
        const fileExtension = path.extname(fileStats.name);
        if (testExtension(extensionFilter, fileExtension)) {
            elfLog.nano('foundDate', mostRecentDate);
            if (moment(fileStats.mtime).isAfter(mostRecentDate)) {
                elfLog.nano('found', fileStats.name);
                walker.fileReport.push({
                    root: root,
                    fileStats: fileStats
                });
            }
        }
        next();
    });

    walkInstance.on('errors', function(root, nodeStatsArray, next) {
        elfLog.error('Error iterating directories');
        elfLog.details(root, nodeStatsArray);
        next();
    });

    walkInstance.on('end', function() {
        elfLog.nano('all done walking directories');
        callback(walker.fileReport);
    });

};

// for more on mtime: https://nodejs.org/api/fs.html#fs_class_fs_stats
walker.buildFileReport = function(directoryToWalk, extensionFilter, mostRecentDate, callback) {
    'use strict';
    walker.fileReport = [];

    function getMissingSummaries(directories, report) {
        directories.forEach(function(directory) {
            const summaryName = directory + '/Summary.md';
            if (!fs.existsSync(summaryName)) {
                elfLog.log(elfLog.logLevelError, 'Could not find: ' + summaryName);
                fs.writeFileSync(summaryName, 'temp');
                const stats = fs.lstatSync(summaryName);
                console.log('MISSING:', stats);
                report.push({
                    'fileName': 'Summary.md',
                    'root': directory,
                    'fileSize': stats.size,
                    'fileData': stats.mtime
                });
            }
        });
    }

    walker.walkDirs(directoryToWalk, extensionFilter, mostRecentDate, function(fileReport) {
        const report = fileReport.map(function(file) {
            return {
                'fileName': file.fileStats.name,
                'root': file.root,
                'fileSize': file.fileStats.size,
                'fileDate': file.fileStats.mtime
            };
        });
        const directories = walker.getDirectories(report);
        getMissingSummaries(directories, report);
        callback(report);
    });
};

walker.getDirectories = function(report) {
    'use strict';

    return report.map(function(record) {
        return record.root;
    }).filter(function(dir, index, dirs) {
        return dirs.indexOf(dir) === index;
    });

};

walker.makePage = function(details, callback) {
    'use strict';

    elfLog.nano('Directories found:' + JSON.stringify(details.directories, null, 4));
    details.callback = callback;
    makePage.init();

    /*
        console.log("About to MISSING SUMMARIES", details.report.missingSummaries);

        details.report.missingSummaries.forEach(function(directory, index) {
            makePage.writeMissingSummary(directory, details);
        });
    */

    details.directories.forEach(function(directory, index) {
        makePage.run(directory, index, details);
    });

};

walker();

module.exports = walker;
