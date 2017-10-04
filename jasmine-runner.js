const Jasmine = require('jasmine');
const SpecReporter = require('jasmine-spec-reporter').SpecReporter;

// const DisplayProcessor = require('./node_modules/jasmine-spec-reporter/src/display-processor');
const DisplayProcessor = require('jasmine-spec-reporter').DisplayProcessor;

function TimeProcessor(options) {}

function getTime() {
    const now = new Date();
    return now.getHours() + ':' +
        now.getMinutes() + ':' +
        now.getSeconds();
}

TimeProcessor.prototype = new DisplayProcessor();

TimeProcessor.prototype.displayFailedSpec = function(spec, log) {
    // return getTime() + ' - ' + log + JSON.stringify(spec, null, 4);
    return getTime() + ' - ' + log;
};

const reporter = new SpecReporter({
    customProcessors: [TimeProcessor]
});

const noop = function() {};

const jrunner = new Jasmine();
jrunner.configureDefaultReporter(reporter);
//jrunner.configureDefaultReporter(new SpecReporter()); // remove default reporter logs
jasmine.getEnv().addReporter(reporter); // add jasm//ine-spec-reporter
jrunner.loadConfigFile(); // load jasmine.json configuration
jrunner.execute();
