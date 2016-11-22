'use strict';

// Add tests: https://www.npmjs.com/package/browsernizr
import 'browsernizr/test/css/flexbox';
import 'browsernizr';
import 'picturefill';
import 'placekeeper';
import $ from 'jquery';
import Tether from 'tether';
import svg4everybody from 'svg4everybody';

// Bootstrap
window.$ = window.jQuery = $;
window.Tether = Tether;
require('bootstrap/js/dist/tooltip');

// IE Polyfill
svg4everybody();
