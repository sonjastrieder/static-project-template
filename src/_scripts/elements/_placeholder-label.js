'use strict';

import {prefix, onLoad} from '../utilities/_helpers';

let $inputs = window.$(`.${prefix('placeholder-label')} .form-control`);

if (!!$inputs.length) {
    const toggle = (el) => {
        let $input = $(el);

        $input[`${!!$input.val() ? 'add' : 'remove'}Class`](prefix('holding'));
    };

    $inputs.on('focus blur keyup change', (e) => toggle(e.currentTarget));

    onLoad(() => {
        $inputs.each((index, input) => toggle(input));
    });
}