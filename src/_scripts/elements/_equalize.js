'use strict';

import {onLoad, onResizeEnd} from '../utilities/_helpers';

let $els = window.$('[data-equal-group]');

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

const filter = (group) => {
    equalize($els.filter(`[data-equal-group=${group}]`));
};

const resize = () => {
    let groups = {};

    $els.each((index, el) => {
        let $el = window.$(el);
        let group = $el.data('equal-group');

        groups[group] = groups[group] ? groups[group].add($el) : $el;
    });

    Object.keys(groups).forEach((group) => {
        equalize(groups[group]);
    });
};

if (!!$els.length) {
    onResizeEnd(resize);

    onLoad(resize);
}

export default {
    'equalize': filter
};