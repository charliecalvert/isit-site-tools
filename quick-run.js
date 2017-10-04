const imageHelp = require('./image-help/index');

const getNotUsed = new imageHelp.GetNotUsed();
getNotUsed.loadConfig(function(report) {
    'use strict';
    console.log(report);
});
