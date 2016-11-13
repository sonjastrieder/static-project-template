'use strict';

import _ from 'lodash';

import {prefix, breakpoints} from '../_vars';

const toDashCase = (str = '') => str.trim().toLowerCase().replace(/[\s_]/g, '-');

const _prefix = (...strings) => strings.map((str) => `${prefix}-${toDashCase(str)}`).join(' ');

const parameters = () => {
    let params = {};
    let pairs = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

    _.forEach(pairs, (pair) => {
        let hash = pair.split('=');

        params[hash[0]] = hash[1] ? unescape(hash[1]) : true;
    });

    return params;
};

const $breakpoint = $(`.${_prefix('breakpoint')}`);

const getBreakpoint = () => $breakpoint.css('font-family');

const isBreakpoint = (breakpoint) => breakpoint ? breakpoint === getBreakpoint() : getBreakpoint();

const isBreakpointAndUp = (breakpoint) => breakpoints.indexOf(breakpoint) <= breakpoints.indexOf(getBreakpoint());

const isBreakpointAndDown = (breakpoint) => breakpoints.indexOf(breakpoint) >= breakpoints.indexOf(getBreakpoint());

const _call = (callbacks) => _.forEach(callbacks, (callback) => callback());

let scrollStopped = true;
let callbacks = {
    'load': [],
    'resize': [],
    'scroll': {
        'start': [],
        'every': [
            _.debounce(() => {
                _call(callbacks.scroll.stop);

                scrollStopped = true;
            }, 250)
        ],
        'stop': []
    }
};

$(window).on({
    'load': _.bind(_call, null, callbacks.load),
    'resize': _.debounce(_.bind(_call, null, callbacks.resize), 250)
});

$(document).on('scroll', (scroll) => {
    if (scrollStopped) {
        _call(callbacks.scroll.start);

        scrollStopped = false;
    }

    _call(callbacks.scroll.every);
});

export default {
    'toDashCase': toDashCase,
    'prefix': _prefix,
    'url': {
        'parameters': parameters,
        'parameter': (key) => parameters()[key]
    },
    'breakpoint': {
        'is': isBreakpoint,
        'up': isBreakpointAndUp,
        'down': isBreakpointAndDown
    },
    'onLoad': (callback) => callbacks.load.push(callback),
    'onResizeEnd': (callback) => callbacks.resize.push(callback),
    'onScrollStart': (callback) => callbacks.scroll.start.push(callback),
    'onScroll': (callback) => callbacks.scroll.every.push(callback),
    'onScrollStop': (callback) => callbacks.scroll.stop.push(callback)
};