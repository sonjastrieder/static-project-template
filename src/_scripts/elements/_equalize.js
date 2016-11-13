'use strict';

/*
    If you want elements to be equal in height and flexbox or fixed height aren't options.

    Options are passed to a series of data attributes, only one of which is required.

    Pass a string value to data-equal-group on all elements that you want to equalize.

    Optionally, you may use data-equal-min and/or data-equal-max to turn this functionality on/off at certain breakpoints.

    As a performance optimization, if the elements are hidden on load/resize they will be skipped. But that means that you may need to manually trigger the equalize functionality on specific/custom events. The exported function accepts a string which should match the group name, this allows the functionality to filter out all other elements, as another performance optimization.
*/

import _ from 'lodash';

import {onLoad, onResizeEnd} from '../utilities/_helpers';

let $els = $('[data-equal-group]');

const equalize = ($group) => {
    $group = $group.filter(':visible');

    if (!!$group.length) {
        let tallest = 0;

        $group
            .css({'height': 'auto'})
            .each((index, el) => {
                let $el = window.$(el);
                let min = $el.data('equal-min') || 0;
                let max = $el.data('equal-max') || Infinity;

                if (window.innerWidth >= min && window.innerWidth <= max) {
                    let height = $el.outerHeight();

                    if (height > tallest) {
                        tallest = height;
                    }
                }
            })
            .css({'height': tallest || 'auto'});
    }
};

const filter = (group) => equalize($els.filter(`[data-equal-group=${group}]`));

const resize = () => {
    let groups = {};

    $els.each((index, el) => {
        let $el = window.$(el);
        let group = $el.data('equal-group');

        groups[group] = groups[group] ? groups[group].add($el) : $el;
    });

    _.forEach(Object.keys(groups), null, (group) => equalize(groups[group]));
};

if (!!$els.length) {
    onResizeEnd(resize);

    onLoad(resize);
}

export default {
    'equalize': filter
};