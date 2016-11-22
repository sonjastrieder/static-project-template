'use strict';

// import and require global js here
// if using a library or plugin for specific functionality
// include it in the file

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

// IE Polyfill
svg4everybody();
