/**
 * Created by charlie on 2/18/16.
 *
 * How to create markdown files
 */

const createMarkdown = require('../private/create-markdown');
const config = require('isit-code-calvert').elfConfig;
config.useLocalConfig = true;

function runConfig(user, siteDirsOffset) {
    'use strict';
    return new Promise(function(resolve, reject) {
        config.loadAsync()
            .then(function(configuration) {
                createMarkdown(configuration[user], siteDirsOffset)
                    .then(resolve);
            })
            .catch(function(err) {
                throw err
            })
    });
}

module.exports = runConfig;
