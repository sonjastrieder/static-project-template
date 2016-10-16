'use strict';

import $ from 'jquery';

import {prefix, breakpoints} from '../_vars';

const lowerDash = (str) => str.trim().toLowerCase().replace(/[\s_]/g, '-');

const prefixStrs = (...strings) => {
    return strings
        .map((str) => {
            return `${prefix}-${lowerDash(str)}`;
        })
        .join(' ');
};

const urlParams = () => {
    let params = {};
    let pairs = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

    pairs.forEach((pair) => {
        let hash = pair.split('=');

        params[hash[0]] = hash[1] ? unescape(hash[1]) : true;
    });

    return params;
};

const urlParam = (key) => urlParams()[key];

const $breakpoint = $('.' + prefixStrs('breakpoint'));

const getBreakpoint = () => $breakpoint.css('font-family');

const isBreakpoint = (breakpoint) => breakpoint ? breakpoint === getBreakpoint() : getBreakpoint();

const isBreakpointAndUp = (breakpoint) => breakpoints.indexOf(breakpoint) <= breakpoints.indexOf(getBreakpoint());

const isBreakpointAndDown = (breakpoint) => breakpoints.indexOf(breakpoint) >= breakpoints.indexOf(getBreakpoint());

export default {
    'breakpoint': {
        'is': isBreakpoint,
        'up': isBreakpointAndUp,
        'down': isBreakpointAndDown
    },
    'lowerDash': lowerDash,
    'prefix': prefixStrs,
    'urlParams': urlParams,
    'urlParam': urlParam
};