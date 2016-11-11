'use strict';

/*
    This is a general initialization of Slick.js carousels.
    Documentation: http://kenwheeler.github.io/slick/

    Custom configuration is passed in using the data-carousel attribute. Options are merged with defaults found below.
*/

import _ from 'lodash';
import $ from 'jquery';
import 'slick-carousel';

import {prefix} from '../utilities/_helpers';

let $carousels = $(`.${prefix('carousel')}`);

if (!!$carousels.length) {
    $carousels
        .each((index) => {
            let $carousel = $carousels.eq(index);

            $carousel.slick(_.merge(
                {},
                {
                    'speed': 300,
                    'dots': true,
                    'arrows': true,
                    'mobileFirst': true,
                    'variableWidth': true,
                    'slidesToShow': 3,
                    'swipeToSlide': true
                },
                $carousel.data('carousel')
            ));
        })
        .removeAttr('data-carousel');
}