/*
 * All public methods you need to access from outside this folder
 */

const walker = require('./private/walker');

module.exports.buildFileReport = walker.buildFileReport;
module.exports.getDirectories = walker.getDirectories;
module.exports.makePage = walker.makePage;
