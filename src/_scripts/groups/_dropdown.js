'use strict';

import {prefix} from '../utilities/_helpers';

let $dropdowns = window.$(`.${prefix('dropdown')}`);

if (!!$dropdowns.length) {
    let prevent = false;

    $dropdowns.on('hide.bs.dropdown', (e) => {
        (prevent && e.preventDefault());

        prevent = false;
    });

    $dropdowns.on('click', '.dropdown-menu [data-prevent]', () => prevent = true);
}