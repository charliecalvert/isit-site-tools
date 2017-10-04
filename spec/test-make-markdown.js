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
    const ImagesList = require('../image-help/index').ImagesList;
    const configureTests = require('./configure-tests');
    const configSettings = require('../image-help/make-markdown/misc/config-settings');
    const elfLog = require('isit-code-calvert').elfLog('test-make-markdown');
    elfLog.setLevel(elfLog.logLevelDetails);
    const elfUtils = require('isit-code-calvert').elfUtils;
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000;

    function deleteExistingMarkdownFiles() {
        const actions = expected.map(elfUtils.deleteFile);
        const results = Promise.all(actions);
        results.then(function(data) {
            elfLog.nano('BE ERROR DELETE SUCCESS', data);
        }).catch(function(err) {
            elfLog.nano('BE ERROR DELETE FAIL');
        });
    }

    beforeEach(function() {
        jasmine.addMatchers(customMatchers);
    });

    beforeEach(function() {
        elfLog.nano('BEFORE EACH');
        deleteExistingMarkdownFiles();
    });

    it('expects true to be true', function() {
        expect(true).toBe(true);
    });

    it('checks the SetSelectedElvenImageNames names for one name', function() {
        elfLog.nano('CHECK FILE NAMES');
        configSettings.setSelectedElvenImages(configureTests.IMAGE_CONFIG_NAMES1);
        const objectNames = configSettings.getSelectedElvenImages();
        expect(objectNames.length).toBe(1);
        expect(objectNames[0]).toBe('california1');

    });

    it('checks the SetSelectedElvenImageNames names for two names', function() {
        elfLog.nano('CHECK FILE NAMES');
        configSettings.setSelectedElvenImages(configureTests.IMAGE_CONFIG_NAMES2);
        const objectNames = configSettings.getSelectedElvenImages();
        expect(objectNames.length).toBe(2);
        expect(objectNames[0]).toBe('california1');
        expect(objectNames[1]).toBe('california2');
    });

    it('checks the SetSelectedElvenImageNames names for three names', function() {
        elfLog.nano('CHECK FILE NAMES');
        configSettings.setSelectedElvenImages(configureTests.IMAGE_CONFIG_NAMES3);
        const objectNames = configSettings.getSelectedElvenImages();

        expect(objectNames.length).toBe(3);
        expect(objectNames[0]).toBe('california1');
        expect(objectNames[1]).toBe('california2');
        expect(objectNames[2]).toBe('california3');
    });

    it('gets images list with one ElvenImageConfig object', function(done) {
        configSettings.setSelectedElvenImages(configureTests.IMAGE_CONFIG_NAMES1);
        const imagesList = new ImagesList();
        imagesList.getImagesList().then(function(imagesList) {
            elfLog.nano(imagesList);
            expect(imagesList[0].selectedConfigObject).toBeTruthy();
            expect(imagesList[0].fileNameReport).toBeTruthy();
            //done();
        }).catch(function(err) {
            console.log(err);
            expect(true).toBe(false);
        }).then(done);
    });

    it('gets images list with two ElvenImageConfig objects', function(done) {
        configSettings.setSelectedElvenImages(configureTests.IMAGE_CONFIG_NAMES2);
        const imagesList = new ImagesList();
        imagesList.getImagesList().then(function(imagesList) {
            elfLog.nano(imagesList);
            expect(imagesList[0].selectedConfigObject).toBeTruthy();
            expect(imagesList[0].fileNameReport).toBeTruthy();
            expect(imagesList[1].selectedConfigObject).toBeTruthy();
            expect(imagesList[1].fileNameReport).toBeTruthy();
            done();
        });
    });

    it('gets images list with three Elven Image Config objects', function(done) {
        configSettings.setSelectedElvenImages(configureTests.IMAGE_CONFIG_NAMES3);
        const imagesList = new ImagesList();
        imagesList.getImagesList().then(function(imagesList) {
            expect(imagesList[0].selectedConfigObject).toBeTruthy();
            expect(imagesList[0].fileNameReport).toBeTruthy();
            expect(imagesList[1].selectedConfigObject).toBeTruthy();
            expect(imagesList[1].fileNameReport).toBeTruthy();
            expect(imagesList[2].selectedConfigObject).toBeTruthy();
            expect(imagesList[2].fileNameReport).toBeTruthy();
            done();
        });
    });

    it('deletes files if they exist', function() {
        const actions = expected.map(elfUtils.deleteFile);
        const results = Promise.all(actions);
        results.then(function(data) {
            elfLog.nano('IT ERROR DELETE SUCCESS', data);
        }).catch(function(err) {
            elfLog.nano('IT ERROR DELETE FAIL');
        });
    });

    it('tests when file exists', function(done) {
        function testToExist(fileName) {
            if (elfUtils.fileExists(fileName)) {
                elfLog.details('FILENAME EXISTS', fileName);
            } else {
                elfLog.details('FILE DOES NOT EXISTS', fileName);
            }
        }

        const imagesList = new ImagesList();
        imagesList.getImagesList().then(function(results) {
            if (typeof results === 'undefined') {
                throw 'undefined result when running';
            }

            testToExist(results[0].selectedConfigObject.markdownFileExists);
            // expect(results[0].selectedConfigObject.markdownFileExists).toBeFalsy();
            done();
        });
    });

    it('creates markdownFile', function(done) {
        const createSmallImage = require('../image-help/make-markdown/reports/create-small-image');

        configSettings.setSelectedElvenImages(configureTests.IMAGE_CONFIG_NAMES2);
        const imagesList = new ImagesList();
        imagesList.getImagesList()
            .then(reportMaker)
            .then(reportChecker)
            .then(createSmallImage.createImages)
            .catch(function(err) {
                console.log(err)
            })
            .then(done)
    });

    it('creates markdownFile with delete', function(done) {
        configSettings.setSelectedElvenImages(configureTests.IMAGE_CONFIG_NAMES2);

        const imagesList = new ImagesList();
        imagesList.getImagesList()
            .then(reportMaker)
            .then(reportChecker)
            .then(deleteMarkdown.delete)
            .catch(function(err) {
                console.log(err)
            })
            .then(done)
    });

});
