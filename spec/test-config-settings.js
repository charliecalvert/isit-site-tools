/**
 * Created by charlie on 7/21/16.
 */

describe('Config Settings Suite', function() {

    'use strict';

    const configSettings = require('../image-help/index').configSettings;
    const configureTests = require('./configure-tests');

    beforeEach(function() {

    });

    it('expects true to be true', function() {
        expect(true).toBe(true);
    });

    it('tests that we can get configSettings', function() {
        expect(configSettings).toBeTruthy();
    });

    it('tests that we can set Selected Elven Images Class', function(done) {
        configSettings.setSelectedElvenImages(configureTests.IMAGE_CONFIG_NAMES2);
        const eic = configSettings.getSelectedElvenImages();
        expect(eic[0]).toBe('california1');
        expect(eic[1]).toBe('california2');
        done();
    });

    it('tests that we can get Selected Elven Images Class', function(done) {
        const eic = configSettings.getSelectedElvenImages();
        expect(eic[0]).toBe('california1');
        expect(eic[1]).toBe('california2');
        done();
    });

    it('tests that we can from configSettings', function(done) {
        const eic = configSettings.getSelectedElvenImages();
        const settings = configSettings.getSelectedElvenImage(eic[0]);
        expect(settings.baseDir).toBe('/var/www/html/images');
        done();
    });
});
