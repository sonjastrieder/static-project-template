'use strict';

import _ from 'lodash';

import {prefix} from '../utilities/_helpers';

let $carousels = window.$(`.${prefix('carousel')}`);

if (!!$carousels.length) {
    let defaults = {
        'speed': 300,
        'dots': true,
        'arrows': true,
        'mobileFirst': true,
        'variableWidth': true,
        'slidesToShow': 3,
        'swipeToSlide': true
    };

    $carousels.each((index) => {
        let $carousel = $carousels.eq(index);

        $carousel.slick(_.merge({}, defaults, $carousel.data('carousel')));
    });
}
