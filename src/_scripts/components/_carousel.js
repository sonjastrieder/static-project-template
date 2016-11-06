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
        'swipeToSlide': true,
        'prevArrow': `
            <button type="button" class="slick-prev">
                <i class="${prefix('icon', 'icon-caret-thin-left')}">
                    <svg>
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-caret-thin-left"></use>
                    </svg>
                </i>
                <span class="sr-only">Previous</span>
            </button>
        `,
        'nextArrow': `
            <button type="button" class="slick-next">
                <i class="${prefix('icon', 'icon-caret-thin-right')}">
                    <svg>
                        <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-caret-thin-right"></use>
                    </svg>
                </i>
                <span class="sr-only">Next</span>
            </button>
        `
    };

    $carousels.each((index) => {
        let $carousel = $carousels.eq(index);

        $carousel.slick(_.merge({}, defaults, $carousel.data('carousel')));
    });
}
