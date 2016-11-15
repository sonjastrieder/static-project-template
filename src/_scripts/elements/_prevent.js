'use strict';

/*
    Prevent default Bootstrap behavior from within by using data-prevent attribute and pass the event to be prevented.
*/

import $ from 'jquery';
import 'bootstrap';

import {prefix} from '../utilities/_helpers';

$(document.body).on('click', '[data-prevent]', (e) => {
    let $target = $(e.currentTarget);
    let event = $target.data('prevent');
    let $parent = $target.closest(event.slice(event.lastIndexOf('.')));

    $parent.one(event, (evt) => evt.preventDefault());
});