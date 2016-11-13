'use strict';

/*
    This is functionality for the placeholder label element which swaps state on focus and when the input has a value.
*/

import {prefix} from '../utilities/_helpers';

let $inputs = $(`.${prefix('placeholder-label')} .form-control`);

if (!!$inputs.length) {
    const toggle = (el) => {
        let $input = $(el);

        $input[`${!!$input.val() ? 'add' : 'remove'}Class`](prefix('holding'));
    };

    $inputs
        .on('focus blur keyup change', (e) => toggle(e.currentTarget))
        .each((index, input) => toggle(input));
}