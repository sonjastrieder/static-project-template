'use strict';

import _ from 'lodash';

import {prefix, breakpoints} from '../_vars';

const lowerDash = (str) => str.trim().toLowerCase().replace(/[\s_]/g, '-');

const prefixStrs = (...strings) => strings.map((str) => `${prefix}-${lowerDash(str)}`).join(' ');

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

const breakpoint = document.getElementById(`${prefixStrs('breakpoint')}`);

const getBreakpoint = () => document.defaultView.getComputedStyle(breakpoint, null).getPropertyValue('font-family');

const isBreakpoint = (breakpoint) => breakpoint ? breakpoint === getBreakpoint() : getBreakpoint();

const isBreakpointAndUp = (breakpoint) => breakpoints.indexOf(breakpoint) <= breakpoints.indexOf(getBreakpoint());

const isBreakpointAndDown = (breakpoint) => breakpoints.indexOf(breakpoint) >= breakpoints.indexOf(getBreakpoint());

let loadCallbacks = [];

window.addEventListener('load', () => {
    loadCallbacks.forEach((callback) => callback());
});

const onLoad = (callback) => loadCallbacks.push(callback);

let resizeEndCallbacks = [];

window.addEventListener('resize', _.debounce(() => {
    resizeEndCallbacks.forEach((callback) => callback());
}, 250));

const onResizeEnd = (callback) => resizeEndCallbacks.push(callback);

let scrollStopped = true;
let scrollStartCallbacks = [];
let scrollCallbacks = [];
let scrollStopCallbacks = [];

const debouncedScroll = _.debounce(() => {
    if (!!scrollStopCallbacks.length) {
        scrollStopCallbacks.forEach((callback) => callback());
    }

    scrollStopped = true;
}, 250);

document.addEventListener('scroll', () => {
    if (scrollStopped) {
        if (!!scrollStartCallbacks.length) {
            scrollStartCallbacks.forEach((callback) => callback());
        }

        scrollStopped = false;
    } else {
        debouncedScroll();
    }

    if (!!scrollCallbacks.length) {
        scrollCallbacks.forEach((callback) => callback());
    }
});

const onScrollStart = (callback) => scrollStartCallbacks.push(callback);

const onScroll = (callback) => scrollCallbacks.push(callback);

const onScrollStop = (callback) => scrollStopCallbacks.push(callback);

export default {
    'lowerDash': lowerDash,
    'prefix': prefixStrs,
    'urlParams': urlParams,
    'urlParam': urlParam,
    'breakpoint': {
        'get': getBreakpoint,
        'is': isBreakpoint,
        'up': isBreakpointAndUp,
        'down': isBreakpointAndDown
    },
    'onLoad': onLoad,
    'onResizeEnd': onResizeEnd,
    'onScrollStart': onScrollStart,
    'onScroll': onScroll,
    'onScrollStop': onScrollStop
};