var path = require('path');
var glob = require('glob');
var runSeries = require('run-series');

var constants = require('./util/constants');
var common = require('./util/common');
var _bundle = require('./util/browserify_wrapper');
var makeSchema = require('./util/make_schema');
var wrapLocale = require('./util/wrap_locale');
/*
 * This script takes one argument
 *
 * Run `npm run build -- dev` or `npm run build -- --dev`
 * to include source map in the plotly.js bundle
 *
 * N.B. This script is meant for dist builds; the output bundles are placed
 *      in plotly.js/dist/.
 *      Use `npm run watch` for dev builds.
 */

var arg = process.argv[2];
var DEV = (arg === 'dev') || (arg === '--dev');


// Check if style and font build files are there
var doesFileExist = common.doesFileExist;
if(!doesFileExist(constants.pathToCSSBuild) || !doesFileExist(constants.pathToFontSVG)) {
    throw new Error([
        'build/ is missing one or more files',
        'Please run `npm run preprocess` first'
    ].join('\n'));
}

var tasks = [];

// Browserify plotly-imago.js
tasks.push(function(cb) {
    _bundle(path.join(constants.pathToLib, 'index-imago.js'), path.join(constants.pathToDist, 'plotly-imago.js'), {
        standalone: 'Plotly',
        debug: DEV,
        compressAttrs: true,
        pathToMinBundle: path.join(constants.pathToDist, 'plotly-imago.min.js')
    }, cb);
});

runSeries(tasks, function(err) {
    if(err) throw err;
});
