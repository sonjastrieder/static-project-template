'use strict';

// Add tests: https://www.npmjs.com/package/browsernizr
import 'browsernizr/test/css/flexbox';

import $ from 'jquery';
import Tether from 'tether';
import Modernizr from 'browsernizr';
import PictureFill from 'picturefill';
import svg4everybody from 'svg4everybody';
import placekeeper from 'placekeeper';

window.$ = window.jQuery = $;
window.Tether = Tether;

require('bootstrap/dist/js/bootstrap');
require('velocity-animate/velocity');
require('velocity-animate/velocity.ui');
require('slick-carousel/slick/slick');

// IE Polyfills
svg4everybody();