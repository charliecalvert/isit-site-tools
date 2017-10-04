/**
 * Created by charlie on 3/5/16.
 */

const MakeMarkdown = (function() {
    'use strict';

    const createMarkdown = require('./create-markdown');
    //var deleteMarkdown = require('./delete-markdown');
    // var elfLog = require('isit-code-calvert').elfLog('make-markdown');
    const elvenCode = require('isit-code-calvert');
    const elfLog = elvenCode.elfLog('make-markdown');

    function MakeMarkdown() {
        elfLog.setLevel(elfLog.logLevelNano);
        elfLog.details('MakeMarkdown constructor called');
    }

    function runCreate(selectedConfigObject, callback) {
        return new Promise(function(resolve, reject) {
            elfLog.details('Calling MakeMarkdown.runCreate');
            createMarkdown.run(selectedConfigObject)
                .then(function(report) {
                    resolve(report);
                })
                .catch(reject);
        });
    }

    MakeMarkdown.prototype.run = function(imagesList) {
        return new Promise(function(resolve, reject) {
            const reports = [];
            imagesList.forEach(function(imageItem) {
                runCreate(imageItem.selectedConfigObject)
                    .then(function(report) {
                        reports.push(report);
                        if (reports.length === imagesList.length) {
                            resolve(reports);
                        }
                    })
                    .catch(reject);
            });
        });
    };

    return MakeMarkdown;

})();

module.exports.MakeMarkdown = MakeMarkdown;

module.exports.reportMaker = function(imagesList) {
    return new Promise(function(resolve, reject) {

        const makeMarkDown = new MakeMarkdown();
        makeMarkDown.run(imagesList)
            .then(function(reports) {
                resolve(reports);
            })
            .catch(function(err) {
                reject(err);
            })
    });
};

