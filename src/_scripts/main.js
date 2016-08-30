'use strict';

// Add tests: https://www.npmjs.com/package/browsernizr
import 'browsernizr/test/css/rgba';
import 'browsernizr';
import $ from 'jquery';
import 'eqcss';
import 'picturefill';
import svg4everybody from 'svg4everybody';

$(() => {
    svg4everybody();
});