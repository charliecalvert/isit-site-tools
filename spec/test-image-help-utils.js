/**
 * Created by charlie on 7/7/16.
 */

describe('Test Image Help Utils', function() {

    'use strict';

    const configureTests = require('./configure-tests');
    //const elfConfig = require('isit-code-calvert').elfConfig;
    const configurationSettings = require('../image-help/index').configSettings;
    it('expects true to be true', function() {
        expect(true).toBe(true);
    });

    it('expects to get slash california', function() {
        const imageConfig = configurationSettings.getSelectedElvenImage(configureTests.IMAGE_CONFIG_NAMES1[0]);
        expect(imageConfig.imageDir).toBe('/california1');
    });

});
