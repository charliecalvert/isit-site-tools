/**
 * Created by charlie on 7/27/16.
 */

describe('Test Check Markdown Suite', function() {
    'use strict';

    const checkMarkdown = require('../image-help/make-markdown/misc/check-markdown');
    const configSettings = require('../image-help/index').configSettings;
    const elfConfig = require('isit-code-calvert').elfConfig;
//    const makeMarkdown = require('../image-help/index').makeMarkdown;
    const validateSchema = require('../image-help/make-markdown/misc/validate-schema');

    it('expects true to be true', function() {
        expect(true).toBe(true);
    });

    it('tests that checkMarkdown is a function', function() {
        //console.log(checkMarkdown);
        expect(typeof checkMarkdown).toBe('function');
    });

    it('tests that checkMarkdown.checkSelectedObjectNames is a function', function() {
        //console.log(checkMarkdown.checkSelectedObjectNames);
        expect(typeof checkMarkdown.checkSelectedObjectNames).toBe('function');
    });

    it('tests that we can get the select object names as an array', function(done) {
        checkMarkdown.checkSelectedObjectNames(function(selectedObjectNames) {
            expect(Array.isArray(selectedObjectNames)).toBe(true);
            expect(selectedObjectNames.length).toBeGreaterThan(1);
            done();
        });
    });

    it('tests that we can get elvenImages', function() {
        const elvenImages = elfConfig.getElvenImages();
        //console.log(elvenImages);
        expect(elvenImages[0].name).toBe('doc');
    });

    it('tests that we can get specific elvenImage called doc', function() {
       const elvenImage = configSettings.getSelectedElvenImage('doc');
       expect(elvenImage.name).toBe('doc');

    });

    it('tests that all elvenImages have baseDir', function(done) {
        checkMarkdown.check(function(result) {
            expect(result).toBe(true);
            done();
        });
    });

    it('tests for derived properties', function(done) {
        checkMarkdown.checkDerived(function(result) {
            expect(result).toBe(true);
            done();
        });
    });

    it('tests for duplicate keys', function(done) {
        checkMarkdown.findDuplicateKeys(function(result) {
            expect(result[0]).not.toContain('duplicate');
            done();
        });
    });

    it('tests for valid schema with best testing method using json schema', function(done) {
        validateSchema('config/ElvenConfig.json', function(result) {
            expect(result.errors.length).toBe(0);
            done();
        });
    });

    it('tests we can get valid record from simple californa1', function(done) {
        const simpleImages = configSettings.getSelectedElvenImage('california1');
        //elfLog.nano("SIMPLE IMAGES", JSON.stringify(simpleImages, null, 4));
        expect(simpleImages.name).toBe('california1');
        expect(simpleImages.baseDir).toBe('/var/www/html/images');
        expect(simpleImages.cloudPath).toBe('https://s3.amazonaws.com/s3bucket01.elvenware.com');
        expect(simpleImages.createSmallImages).toBeDefined();
        done();
    });

    it('tests we can get valid extended record from simple californa1', function(done) {
        const simpleImages = configSettings.getSelectedElvenImage('california1');
        expect(simpleImages.name).toBe('california1');
        expect(simpleImages.baseDir).toBe('/var/www/html/images');
        expect(simpleImages.cloudPath).toBe('https://s3.amazonaws.com/s3bucket01.elvenware.com');
        expect(simpleImages.createSmallImages).toBeDefined();
        expect(simpleImages.imageDir).toBe('/california1');
        expect(simpleImages.allImagesJsonFile).toContain('all-images-' + 'california1.json');
        expect(simpleImages.markdownFileWithImages).toContain('california1.md');
        expect(simpleImages.notUsedDir).toContain('not-used/' + 'california1');
        done();
    });
});
