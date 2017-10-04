/**
 * Created by charlie on 12/26/15.
 *
 * Use walk-core.js to access this module.
 */

const marked = require('marked');
const renderer = new marked.Renderer();
const pug = require('pug');
const fs = require('fs');
const utils = require('./utils');
const elfUtils = require('isit-code-calvert').elfUtils;
const elfLog = require('isit-code-calvert').elfLog('private-setup-marked');
elfLog.elfName = 'setup-marked';
const path = require('path');

const setupMarked = function(toc, highlightInit) {
    'use strict';

    const highlight = highlightInit;
    const tocChecker = [];

    function getAnchor(prefix, raw) {

        let anchor;

        const index = raw.indexOf('{#');

        if (index > -1) {
            anchor = raw.trim().slice(index + 2, (raw.length - 1));
        } else {
            anchor = prefix + raw.toLowerCase().replace(/[^\w]+/g, '-');
        }
        return anchor;
    }

    renderer.code = function(code, lang, escaped) {
        if (highlight) {
            if (lang === 'nohighlighting') {
                return '<pre>' + code + '\n</pre>\n';
            }

            if (this.options.highlight) {
                const out = this.options.highlight(code, lang);
                if (out !== null && out !== code) {
                    escaped = true;
                    code = out;
                }
            }

            if (!lang) {
                return '<pre><code>' +
                    (escaped ? code : escape(code, true)) +
                    '\n</code></pre>';
            }

            return '<pre><code class="' +
                this.options.langPrefix +
                escape(lang, true) + '">' +
                (escaped ? code : escape(code, true)) +
                '\n</code></pre>\n';
        } else {
            return '<pre>' + code + '\n</pre>\n';
        }
    };

    renderer.heading = function(text, level, raw) {
        elfLog.log("heading called: " + text + " : " + level + " : " + raw);

        const anchor = getAnchor(this.options.headerPrefix, raw);

        const index = text.indexOf('{#');
        if (index > -1) {
            text = text.slice(0, index).trim();
        }

        const details = {
            anchor: anchor,
            level: level,
            text: text,
            element: '<li><a href="#' + anchor + '">' + text + '</a></li>',
            fileName: this.options.filename
        };

        // TODO: Fix this hack. Why is heading getting called twice?
        const doPush = tocChecker.indexOf(details.text) === -1;

        if (doPush) {
            tocChecker.push(details.text);
            toc.push(details);

            toc[0].toc.push(details.element);
        }
        // END Hack

        const landingSpot = '<a class="anchor" id="' + anchor + '"></a>\n';
        return landingSpot + '<h' + level + '>' + text + '</h' + level + '>\n';

    };

    const markedOptions = {
        renderer: renderer,
        gfm: true,
        tables: true,
        highlight: false
    };

    if (highlight) {
        markedOptions.highlight = function(codeToHighlight) {
            return require('highlight.js').highlightAuto(codeToHighlight).value;
        };
    }
    elfLog.log('setting marked options');
    marked.setOptions(markedOptions);

    return {
        'filename': 'Render.js',
        'md': marked,
        'basedir': process.env.HOME,
        'title': 'My Title'
    };
};

setupMarked.insertToc = function(source, itemToInsert) {
    'use strict';
    const index = source.indexOf('<!--TOC_End-->');
    return [source.slice(0, index), itemToInsert, source.slice(index)].join('');
};

setupMarked.getSingleFile = function(fileName, fullPath, highlight, testRun, bootswatch) {
    'use strict';

    elfLog.log('single file called', fileName);

    if (typeof bootswatch === 'undefined') {
        bootswatch = 'flatly';
    }

    const bootswatchUrls = {
        'cerulean': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/cerulean/bootstrap.min.css',
        'cosmo': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/cosmo/bootstrap.min.css',
        'cyborg': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/cyborg/bootstrap.min.css',
        'darkly': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/darkly/bootstrap.min.css',
        'flatly': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/flatly/bootstrap.min.css',
        'journal': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/journal/bootstrap.min.css',
        'lumen': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/lumen/bootstrap.min.css',
        'sandstone': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/sandstone/bootstrap.min.css',
        'slate': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/slate/bootstrap.min.css',
        'readable': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/readable/bootstrap.min.css',
        'spacelab': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/spacelab/bootstrap.min.css',
        'superhero': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/superhero/bootstrap.min.css',
        'united': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/united/bootstrap.min.css',
        'yeti': 'https://maxcdn.bootstrapcdn.com/bootswatch/3.3.7/yeti/bootstrap.min.css'
    };

    let jadeToRender;
    const toc = [{
        toc: []
    }];
    const options = setupMarked(toc, highlight);

    options.title = utils.stripExtension(fileName);

    const data = fs.readFileSync(fullPath, 'utf8');
    let viewsPath = path.resolve(__dirname + '/../../views/');
    viewsPath = elfUtils.ensureEndsWithPathSep(viewsPath, marked(data));
    const tempHtml = viewsPath + 'temp.html';
    elfLog.nano(tempHtml);
    fs.writeFileSync(tempHtml, marked(data));

    //fs.writeFileSync(path.resolve('../views/temp.html'), marked(data));

    if (!testRun) {
        //jadeToRender = 'extends ../node_modules/elven-site-tools/views/standard-base\nblock append content\n';
        jadeToRender = 'extends standard-base\nblock append content\n';
    } else {
        jadeToRender = 'extends standard-base\nblock append content\n';
    }

    // const fileName = fullPath;
    jadeToRender += '\tdiv.container\n';
    jadeToRender += '\t\tinclude temp.html';

    const tempJade = viewsPath + 'temp.pug';
    elfLog.nano(tempJade);
    fs.writeFileSync(tempJade, jadeToRender);

    let html = pug.renderFile(tempJade, options);

    html = setupMarked.insertToc(html, toc[0].toc.join('\n'));
    html = html.replace('<!--bootstrap-css-->', '<link href="' + bootswatchUrls[bootswatch] + '" rel="stylesheet">');
    return html;
};

module.exports = setupMarked;
