const fs = require('fs');
const elfLog = require('isit-code-calvert').elfLog('create-markdown');
const walkCore = require('../walk-core');
const utils = require('isit-code-calvert').elfUtils;

function makeReportStructure(configSummary, destinationDir, details, masterListOfNames, htmlFilesWritten) {
    return {
        result: 'success',
        baseDir: configSummary.baseDir,
        mostRecentDate: configSummary.mostRecentDate,
        destinationDir: destinationDir,
        directories: details.directories,
        masterListOfNames: masterListOfNames,
        htmlFilesWritten: htmlFilesWritten
    };
}

function createDetails(report, directoryToWalk, destinationDir) {
    return {
        report: report,
        directoryToWalk: directoryToWalk,
        destinationDir: destinationDir,
        directories: walkCore.getDirectories(report),
        highlight: false,
        testRun: true
    };
}

function pageMaker(details, configSummary, destinationDir) {
    return new Promise(function(resolve, reject) {
        walkCore.makePage(details, function(masterListOfNames, htmlFilesWritten) {
            const report = makeReportStructure(configSummary, destinationDir, details, masterListOfNames, htmlFilesWritten);
            const reportName = 'RunReport.txt';
            utils.writeFile(reportName, JSON.stringify(report, null, 4), function() {
                elfLog.info('Wrote report to: ', reportName);
                resolve(report);
            });
        });
    });
}

module.exports = function (configSummary, directoryIndex) {
    'use strict';
    return new Promise(function(resolve, reject) {
        elfLog.setLevel(elfLog.logLevelNano);
        const directoryToWalk = configSummary['base-dir'] + configSummary['site-dirs'][directoryIndex];
        const destinationDir = configSummary['destination-dirs'][directoryIndex];
        const mostRecentDate = configSummary['most-recent-date'];
        fs.access(directoryToWalk, fs.F_OK | fs.R_OK, function(err) {
            if (err) {
                throw err;
            } else {
                elfLog.details('Folder to Walk: ' + directoryToWalk);

                walkCore.buildFileReport(directoryToWalk, '.md', mostRecentDate, function(report) {
                    elfLog.nano('In buildFileReport callback');
                    const details = createDetails(report, directoryToWalk, destinationDir);
                    pageMaker(details, configSummary, destinationDir)
                        .then(resolve)
                });
            }
        });
    });
};
