'use strict';

// Add tests: https://www.npmjs.com/package/browsernizr
// import 'browsernizr/test/css/rgba';

import $ from 'jquery';
import EQCSS from 'eqcss';
import Tether from 'tether';
import Modernizr from 'browsernizr';
import PictureFill from 'picturefill';
import svg4everybody from 'svg4everybody';

window.$ = window.jQuery = $;
window.Tether = Tether;

require('jquery.resizeend/dist/jquery.resizeend');
require('jquery-scrollstop/jquery.scrollstop');
require('bootstrap/dist/js/bootstrap');

$(() => {
    svg4everybody();
});