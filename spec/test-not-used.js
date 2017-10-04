/**
 * Created by charlie on 3/4/16.
 */

describe('Test Not Used Suite', function() {
    'use strict';

    const elfConfig = require('isit-code-calvert').elfConfig;
    const elfLog = require('isit-code-calvert').elfLog('test-not-used');
    const configurationSettings = require('../image-help/index').configSettings;
    const configureTests = require('./configure-tests');
    const imagesUsed = require('../image-help/index').imagesUsed;
    const findUsedImages = require('../image-help/index').findUsedImages;


    // jscs:disable maximumLineLength
    const imagesOne = [
        '[![/images/california/2015-12-19 09.35.14-small.jpg](/images/california/2015-12-19 09.35.14-small.jpg)](/images/california/2015-12-19 09.35.14.jpg)'
    ];

    const imagesFive = [
        '[![/images/california/2015-12-19 09.35.14-small.jpg](/images/california/2015-12-19 09.35.14-small.jpg)](/images/california/2015-12-19 09.35.14.jpg)',
        '[![/images/california/2015-12-19 09.35.26-small.jpg](/images/california/2015-12-19 09.35.26-small.jpg)](/images/california/2015-12-19 09.35.26.jpg)',
        '[![/images/california/2015-12-19 09.52.08-small.jpg](/images/california/2015-12-19 09.52.08-small.jpg)](/images/california/2015-12-19 09.52.08.jpg)',
        '[![/images/california/2015-12-19 09.52.14-small.jpg](/images/california/2015-12-19 09.52.14-small.jpg)](/images/california/2015-12-19 09.52.14.jpg)',
        '[![/images/california/2015-12-19 09.52.17-small.jpg](/images/california/2015-12-19 09.52.17-small.jpg)](/images/california/2015-12-19 09.52.17.jpg)'
    ];
    // jscs:enable

    it('gets images used for one line', function() {
        imagesUsed.findMatches(imagesOne[0]);
        expect(imagesUsed.imagesUsedList[0]).toBe('/images/california/2015-12-19 09.35.14-small.jpg');
        expect(imagesUsed.imagesUsedList[1]).toBe('/images/california/2015-12-19 09.35.14.jpg');
    });

    it('gets images used for five lines', function() {

        imagesUsed.findMatches(imagesFive[0]);
        expect(imagesUsed.imagesUsedList[0]).toBe('/images/california/2015-12-19 09.35.14-small.jpg');
        expect(imagesUsed.imagesUsedList[1]).toBe('/images/california/2015-12-19 09.35.14.jpg');

        imagesUsed.findMatches(imagesFive[1]);
        expect(imagesUsed.imagesUsedList[2]).toBe('/images/california/2015-12-19 09.35.26-small.jpg');
        expect(imagesUsed.imagesUsedList[3]).toBe('/images/california/2015-12-19 09.35.26.jpg');

        imagesUsed.findMatches(imagesFive[2]);
        expect(imagesUsed.imagesUsedList[4]).toBe('/images/california/2015-12-19 09.52.08-small.jpg');
        expect(imagesUsed.imagesUsedList[5]).toBe('/images/california/2015-12-19 09.52.08.jpg');

        imagesUsed.findMatches(imagesFive[3]);
        expect(imagesUsed.imagesUsedList[6]).toBe('/images/california/2015-12-19 09.52.14-small.jpg');
        expect(imagesUsed.imagesUsedList[7]).toBe('/images/california/2015-12-19 09.52.14.jpg');

        imagesUsed.findMatches(imagesFive[4]);
        expect(imagesUsed.imagesUsedList[8]).toBe('/images/california/2015-12-19 09.52.17-small.jpg');
        expect(imagesUsed.imagesUsedList[9]).toBe('/images/california/2015-12-19 09.52.17.jpg');
    });

    it('gets image difference', function(done) {
        const images = imagesOne;
        const allImages = [
            '/images/california/2015-12-19 09.35.14.jpg',
            '/images/california/2015-12-19 09.35.14-small.jpg',
            '/images/california/2015-12-19 09.35.18.jpg',
            '/images/california/2015-12-19 09.35.18-small.jpg'
        ];

        elfConfig.useLocalConfig = true;

        const settings = configurationSettings.getSelectedElvenImage(configureTests.IMAGE_CONFIG_NAMES1[0]);
        expect(settings).toBeTruthy();
        for (let i = 0; i < images.length; i++) {
            imagesUsed.findMatches(images[i]);
        }

        const commands = findUsedImages.getCommands(settings,
            allImages, imagesUsed.imagesUsedList);
        elfLog.details('Commands: ', commands);
        expect(commands).toContain('09.35.18');
        expect(commands).toContain('09.35.18-small.jpg');
        expect(commands).not.toContain('09.35.14.jpg');
        expect(commands).not.toContain('09.35.14-small.jpg');
        done();

    });

    it('gets image difference bigger', function(done) {
        const images = imagesFive;
        const allImages = [
            '/images/california/2015-12-19 09.35.14.jpg',
            '/images/california/2015-12-19 09.35.14-small.jpg',
            '/images/california/2015-12-19 09.35.18.jpg',
            '/images/california/2015-12-19 09.35.18-small.jpg',
            '/images/california/2015-12-19 09.35.26.jpg',
            '/images/california/2015-12-19 09.35.26-small.jpg',
            '/images/california/2015-12-19 09.52.08.jpg',
            '/images/california/2015-12-19 09.52.08-small.jpg',
            '/images/california/2015-12-19 09.52.14.jpg',
            '/images/california/2015-12-19 09.52.14-small.jpg',
            '/images/california/2015-12-19 09.52.17.jpg',
            '/images/california/2015-12-19 09.52.17-small.jpg',
            '/images/california/2015-12-19 09.52.45.jpg',
            '/images/california/2015-12-19 09.52.45-small.jpg',
            '/images/california/2015-12-19 09.52.49.jpg',
            '/images/california/2015-12-19 09.52.49-small.jpg',
            '/images/california/2015-12-19 09.52.53.jpg',
            '/images/california/2015-12-19 09.52.53-small.jpg',
            '/images/california/2015-12-19 12.10.18.jpg',
            '/images/california/2015-12-19 12.10.18-small.jpg',
            '/images/california/2015-12-19 13.09.50.jpg',
            '/images/california/2015-12-19 13.09.50-small.jpg'
        ];

        elfConfig.useLocalConfig = true;
        const settings = configurationSettings.getSelectedElvenImage(configureTests.IMAGE_CONFIG_NAMES1[0]);
        expect(settings).toBeTruthy();
        for (let i = 0; i < images.length; i++) {
            imagesUsed.findMatches(images[i]);
        }

        const commands = findUsedImages.getCommands(settings.notUsedDir,
            allImages, imagesUsed.imagesUsedList);

        expect(commands).toContain('09.35.18');
        expect(commands).toContain('09.35.18-small.jpg');
        expect(commands).not.toContain('09.35.14.jpg');
        expect(commands).not.toContain('09.35.14-small.jpg');

        done();
    });
});
