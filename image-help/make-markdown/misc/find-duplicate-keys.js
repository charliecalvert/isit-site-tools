const PythonShell = require('python-shell');
// const elfLog = require('isit-code-calvert').elfLog('find-duplicate-keys');

function findDuplicateKeys(callback) {
    // console.log('findDuplicateKeys called');
    const options = {
        mode: 'text',
        pythonPath: '/usr/bin/python3',
        pythonOptions: [],
        scriptPath: 'python/',
        args: []
    };

    const fileName = 'find_duplicate_keys.py';

    try {
        PythonShell.run(fileName, options, function(err, results) {
            if (err) {
                throw err;
            }
            // results is an array consisting of messages collected during execution
            // console.log('results: %j', results);
            callback(results);
        });
    } catch (e) {
        console.log(e);
        callback(e);
    }
}

module.exports = findDuplicateKeys;
