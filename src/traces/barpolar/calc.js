/**
* Copyright 2012-2018, Plotly, Inc.
* All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE file in the root directory of this source tree.
*/

'use strict';

var hasColorscale = require('../../components/colorscale/has_colorscale');
var colorscaleCalc = require('../../components/colorscale/calc');
var arraysToCalcdata = require('../bar/arrays_to_calcdata');
var calcSelection = require('../scatter/calc_selection');

module.exports = function calc(gd, trace) {
    var fullLayout = gd._fullLayout;
    var subplotId = trace.subplot;
    var radialAxis = fullLayout[subplotId].radialaxis;
    var angularAxis = fullLayout[subplotId].angularaxis;
    var rArray = radialAxis.makeCalcdata(trace, 'r');
    var thetaArray = angularAxis.makeCalcdata(trace, 'theta');
    var len = trace._length;
    var cd = new Array(len);

    function c2rad(v) {
        return angularAxis.c2rad(v, trace.thetaunit);
    }

    // 'size' axis variables
    var sArray;
    // 'pos' axis variables
    var pArray;

    if(trace.orientation === 'radial') {
        sArray = rArray;
        pArray = thetaArray.map(c2rad);
    } else {
        sArray = thetaArray.map(c2rad);
        pArray = rArray;
    }

    for(var i = 0; i < len; i++) {
        cd[i] = {
            p: pArray[i],
            s: sArray[i],
            theta: thetaArray[i]
        };
    }

    if(hasColorscale(trace, 'marker')) {
        colorscaleCalc(trace, trace.marker.color, 'marker', 'c');
    }
    if(hasColorscale(trace, 'marker.line')) {
        colorscaleCalc(trace, trace.marker.line.color, 'marker.line', 'c');
    }

    arraysToCalcdata(cd, trace);
    calcSelection(cd, trace);

    return cd;
};
