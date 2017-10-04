/**
 * Created by charlie on 3/7/16.
 */

describe('Test Make Markdown Suite', function() {
    'use strict';

    const expected = [
        '/home/charlie/ElvenImages/california1.md',
        '/home/charlie/ElvenImages/california2.md'
    ];

    const customMatchers = require('./custom-matchers');
    const reportMaker = require('../image-help/index').reportMaker;
    const reportChecker = require('../image-help/index').reportChecker;
    const deleteMarkdown = require('../image-help/index').deleteMarkdown;
    const configureTests = require('./configure-tests');
    const configSettings = require('../image-help/make-markdown/misc/config-settings-async');
    const ImagesList = require('../image-help/index').ImagesList;
    const elfLog = require('isit-code-calvert').elfLog('test-make-markdown');
    const elfUtils = require('isit-code-calvert').elfUtils;

    beforeEach(function() {
        jasmine.addMatchers(customMatchers);

        elfLog.setLevel(elfLog.logLevelDetails);
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
    });

    beforeEach(function() {
        elfLog.nano('BEFORE EACH');
        const actions = expected.map(elfUtils.deleteFile);
        const results = Promise.all(actions);
        results.then(function(data) {
            elfLog.nano('BE ERROR DELETE SUCCESS', data);
        }).catch(function(err) {
            throw new Error(err);
        });
    });

    it('expects true to be true', function() {
        expect(true).toBe(true);
    });

    it('deletes files if they exist', function() {
        const actions = expected.map(elfUtils.deleteFile);
        const results = Promise.all(actions);
        results.then(function(data) {
            elfLog.nano('IT ERROR DELETE SUCCESS', data);
        }).catch(function(err) {
            throw err;
        });
    });

    it('checks the file names', function(done) {
        elfLog.nano('CHECK FILE NAMES');
        configSettings.setSelectedElvenImages(configureTests.IMAGE_CONFIG_NAMES)
            .then(configSettings.getSelectedElvenImages()
                .then(function(objectNames) {
                    // Make sure california1.md and california2.md exist
                    // These are the selectedObjectNames
                    expect(objectNames[0]).toBe('california1');
                    expect(objectNames[1]).toBe('california2');
                    done();
                }))
    });

    it('sets selected elven images', function() {
        configSettings.setSelectedElvenImages(configureTests.IMAGE_CONFIG_NAMES)
            .then(function(result) {
                console.log(result);
                expect(true).toBe(true);
            });
    });

    it('gets the file names', function(done) {
        configSettings.setSelectedElvenImages(configureTests.IMAGE_CONFIG_NAMES2)
            .then(configSettings.getSelectedElvenImages)
            .then(function(elvenImages) {
                elvenImages.forEach(function(objectName, index) {
                    const selectedConfigObject = configSettings.getSelectedElvenImage(objectName);
                    expect(selectedConfigObject.markdownFileWithImages).toBe(expected[index]);
                })
            })
            .catch(function(err) {
                console.log(err);
            }).then(done);
    });

    it('tests when file exists', function(done) {
        function testToExist() {
            const fileName = '/home/charlie/ElvenImages/california2.md';
            if (elfUtils.fileExists(fileName)) {
                console.log('FILENAME EXISTS', fileName);
            } else {
                console.log('FILE DOES NOT EXISTS', fileName);
            }
        }

        const imagesList = new ImagesList();
        imagesList.getImagesList().then(function(results) {
            if (typeof results === 'undefined') {
                throw 'undefined result when running';
            }

            testToExist(results[0].selectedConfigObject.markdownFileExists);
            done();
        });
    });

    it('creates and then deletes markdownFile', function(done) {
        console.log('DELETES MAKEDOWN');
        elfLog.nano('Deletes markdownfile');
        const imagesList = new ImagesList();
        imagesList.getImagesList()
            .then(reportMaker)
            .then(reportChecker)
            .then(deleteMarkdown.delete)
            .catch(function(err) {
                console.log(err)
            })
            .then(done);
    });
});
