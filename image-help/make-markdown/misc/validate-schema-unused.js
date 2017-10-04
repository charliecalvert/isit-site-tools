
module.exports.unused = {
    elvenImageSchema: {
        'id': '/ElvenImage',
        'type': 'object',
        'properties': {
            'Foo': {
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
            },
            'imageDir': {
                'type': 'string'
            },
            'markdownFileWithImages': {
                'type': 'string'
            },
            'allImagesJsonFile': {
                'type': 'string'
            },
            'notUserDir': {
                'type': 'string'
            }
        },
        'required': ['Foo', 'baseDir', 'cloudPath', 'createSmallImages', 'imageDir', 'markdownFileWithImages']
    },

    schemaImages: {
        'id': '/images',
        'type': 'object',
        'properties': {
            'calvert': {
                'type': 'object'
            },
            'elvenImages': [{
                '$ref': '/ElvenImage'
            }]
        },
        'required': ['calvert', 'elvenImages']

    },

    elvenConfig: {
        'calvert': {
            'base-dir': '/home/charlie/',
            'site-dirs': [
                'Documents/AllTest',
                'Git/CloudNotes/Assignments',
                'Git/CloudNotes/Prog270',
                'Git/CloudNotes/Isit322'
            ],
            'destination-dirs': [
                '/var/www/html/',
                '/var/www/html/Assignments/',
                '/var/www/html/Prog270/',
                '/var/www/html/Isit322/'
            ],
            'destination-dirs-extra': [{
                'base': '/var/www/html/',
                'extra': ''
            },
                {
                    'base': '/var/www/html/Assignments/',
                    'extra': 'Assignments'
                }
            ]
        },
        'elvenImages': [{
            'name': 'doc',
            'baseDir': 'The base directory where the images to be processed are found',
            'cloudPath': 'Base string found in markdown files',
            'createSmallImages': true,
            'imageDir': 'Append this to both baseDir and cloudPath',
            'markdownFileWithImages': 'The markdown file to create',
            'allImagesJsonFile': 'all-images.json',
            'notUsedDir': 'Where to store images if the editor decides not to use them.'
        },
            {
                'name': 'california',
                'baseDir': '/var/www/html/images',
                'cloudPath': 'https://s3.amazonaws.com/s3bucket01.elvenware.com',
                'createSmallImages': true,
                'imageDir': '/california1',
                'markdownFileWithImages': '/home/charlie/Documents/AllTest/california1.md',
                'allImagesJsonFile': 'all-images-california1.json',
                'notUsedDir': '/home/charlie/temp/not-used/california1'
            }
        ]
    }
};
