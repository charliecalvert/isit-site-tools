/**
 * Created by charlie on 3/5/16.
 */

const CreateMarkdown = (function() {
    'use strict';

    const elfUtils = require('isit-code-calvert').elfUtils;
    const makeReport = require('./reports/make-report');
    const siteUtils = require('../utilities');
    const errorMessages = require('../error-messages');

    const walker = require('isit-code-calvert').walker;
    let report;

    function CreateMarkdown() {
    }

    CreateMarkdown.prototype.buildImagesList = function(selectedConfigObject, imagesList) {
        return new Promise(function(resolve) {
            const picturePath = siteUtils.getPicturePath(selectedConfigObject.baseDir, selectedConfigObject.imageDir);

            walker.walkDirs(picturePath, makeReport.extension, function(fileReport) {
                imagesList.push({
                    selectedConfigObject: selectedConfigObject,
                    fileNameReport: walker.getFullFileNames(fileReport)
                });
                resolve(imagesList);
            });
        });
    };

    function createReport(selectedConfigObject) {
        return new Promise(function(resolve) {
            const makeReportStructure = require('./reports/report-structure');
            const picturePath = siteUtils.getPicturePath(selectedConfigObject.baseDir, selectedConfigObject.imageDir);

            walker.walkDirs(picturePath, makeReport.extension, function(fileReport) {
                report = makeReportStructure();
                const fileNameReport = walker.getFullFileNames(fileReport);

                makeReport.run(selectedConfigObject, report, fileNameReport);

                siteUtils.writeMarkdownFileWithImages(selectedConfigObject.markdownFileWithImages, report.markdown);
                const stringImages = JSON.stringify(report.allImages, null, 4) + '\n';
                siteUtils.writeMarkdownFileWithImages(selectedConfigObject.allImagesJsonFile, stringImages);
                report.success = true;
                report.markdownFileWithImages = selectedConfigObject.markdownFileWithImages;
                report.allImagesFile = selectedConfigObject.allImagesJsonFile;
                report.markdownFileCreated = true;
                resolve(report);
            })
        })
    }

    CreateMarkdown.prototype.run = function(selectedConfigObject) {
        return new Promise(function(resolve, reject) {

            if (!elfUtils.fileExists(selectedConfigObject.markdownFileWithImages)) {
                createReport(selectedConfigObject)
                    .then(resolve)
                    .catch(reject);
            } else {
                reject({
                    success: false,
                    fileName: selectedConfigObject.markdownFileWithImages,
                    error: 'File exists',
                    consoleMessage: errorMessages.markdownFileExists(selectedConfigObject.markdownFileWithImages)
                });
            }
        });
    };

    return CreateMarkdown;

})();

module.exports = new CreateMarkdown();
