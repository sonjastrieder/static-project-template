'use strict';

/*
    By default any click will close a dropdown. To allow for more complicated interactions within dropdown menus (such as a nested collapse or a series of filters) you can add a data-prevent attribute to those elements (or their parent so long as it's a descendant of the .dropdown-menu element).
*/

import {prefix} from '../utilities/_helpers';

let $dropdowns = $(`.${prefix('dropdown')}`);

if (!!$dropdowns.length) {
    let prevent = false;

    $dropdowns.on('hide.bs.dropdown', (e) => {
        (prevent && e.preventDefault());

        prevent = false;
    });

    $dropdowns.on('click', '.dropdown-menu [data-prevent]', () => prevent = true);
}