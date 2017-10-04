/**
 * Created by charlie on 7/29/16.
 */

// Test the ElvenConfig.json file
// BOTH THIS and switch-config-to-array.py do the same thing and work
// const elfLog = require('isit-code-calvert').elfLog('validate-schema');
const fs = require('fs');
const Validator = require('jsonschema').Validator;
const v = new Validator();

const wholeSchema = {
    '$schema': 'http://json-schema.org/draft-04/schema#',
    'type': 'object',
    'properties': {
        'calvert': {
            'type': 'object',
            'properties': {
                'base-dir': {
                    'type': 'string'
                },
                'site-dirs': {
                    'type': 'array',
                    'items': {
                        'type': 'string'
                    }
                },
                'destination-dirs': {
                    'type': 'array',
                    'items': {
                        'type': 'string'
                    }
                },
                'destination-dirs-extra': {
                    'type': 'array',
                    'items': {
                        'type': 'object',
                        'properties': {
                            'base': {
                                'type': 'string'
                            },
                            'extra': {
                                'type': 'string'
                            }
                        },
                        'required': [
                            'base',
                            'extra'
                        ]
                    }
                }
            },
            'required': [
                'base-dir',
                'site-dirs',
                'destination-dirs',
                'destination-dirs-extra'
            ]
        },
        'elvenImages': {
            'type': 'array',
            'items': {
                'type': 'object',
                'properties': {
                    'name': {
                        'type': 'string'
                    },
                    'baseDir': {
                        'type': 'string'
                    },
                    'cloudPath': {
                        'type': 'string'
                    },
                    'createSmallImages': {
                        'type': 'boolean'
                    }
                },
                'required': [
                    'name',
                    'baseDir',
                    'cloudPath',
                    'createSmallImages'
                ]
            }
        }
    },
    'required': [
        'calvert',
        'elvenImages'
    ]
};

function run(fileName, callback) {
    fs.readFile(fileName, 'utf8', function(err, data) {
        // v.addSchema(elvenImageSchema, '/ElvenImage');
        if (err) {
            throw err;
        }
        data = JSON.parse(data);
        const result = v.validate(data, wholeSchema);
        if (result.errors.length > 0) {
            console.log(result.errors);
        }
        if (callback) {
            callback(result);
        } else {
            console.log(result);
        }
    });
}

module.exports = run;
