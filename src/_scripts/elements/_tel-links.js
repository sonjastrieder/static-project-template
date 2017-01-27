'use strict';

import $ from 'jquery';

import {prefix} from '../utilities/_helpers';

// if not a mobile device, disable tel links
(function($) {
    var $telLinks = $('a[href^="tel:"]');
    // if not mobile
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent (see summary at bottom of page)
    if (!/Mobi/.test(navigator.userAgent)) {
        // http://stackoverflow.com/questions/754607/can-jquery-get-all-css-styles-associated-with-an-element#answer-6416527
        $.fn.getStyleObject = function(){
            var dom = this.get(0);
            var style;
            var returns = {};
            if(window.getComputedStyle){
                var camelize = function(a,b){
                    return b.toUpperCase();
                };
                style = window.getComputedStyle(dom, null);
                for(var i = 0, l = style.length; i < l; i++){
                    var prop = style[i];
                    var camel = prop.replace(/\-([a-z])/g, camelize);
                    var val = style.getPropertyValue(prop);
                    returns[camel] = val;
                };
                return returns;
            };
            if(style = dom.currentStyle){
                for(var prop in style){
                    returns[prop] = style[prop];
                };
                return returns;
            };
            return this.css();
        }
        $telLinks.each(function(index, link) {
            var $link = $(link),
                prefixedClass = prefix('tel-link'),
                $newElement = $(`<span class="${prefixedClass}"></span>`),
                linkText = $link.text(),
                elementCSS = $link.getStyleObject();
            $newElement.css(elementCSS);
            $newElement.text(linkText);
            $link.replaceWith($newElement);
        });
    }
})(jQuery);
