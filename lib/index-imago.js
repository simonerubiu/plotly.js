/**
 * Copyright 2012-2018, Plotly, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';

var Plotly = require('./core');

// traces
Plotly.register([
    require('./heatmap'),
    require('./sankey'),
]);

Plotly.register([
    require('./locales/it'),
    //require('./locales/en'), //DEFAULTS
]);

module.exports = Plotly;
