//const getNotUsed = require('./image-help/index').getNotUsed;
const configSettings = require('./image-help/index').configSettings;

const elfConfig = require('elven-code').elfConfig;

elfConfig.load(function() {
    console.log('CONFIG SETTINGS:', configSettings);
    console.log(configSettings.getSelectedElvenImage('testImages'));
    /*
        getNotUsed.loadConfig(function(report) {
            console.log(report);
        });
    */

});
