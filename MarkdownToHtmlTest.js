/**
 * Created by charlie on 1/1/16.
 */

const runConfig = require('./index').walkRunner;
runConfig('calvert', 2)
    .then(function(report) {
       var keys = Object.keys(report);
       console.log('The object created has the following properties:\n\n',
           keys, '\n');
    })
    .catch(function(err) {
       console.log(err);
    });
