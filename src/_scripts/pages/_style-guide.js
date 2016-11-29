// this generates html for the style guide / pattern library elements, groups, components, modules
// an element, group, component, or module needs to have a top-level html element, because $.html() selects the first element, so if there are siblings, will only select the first

import {prefix} from '../utilities/_helpers';
import Prism from 'prismjs';
import Clipboard from 'clipboard/dist/clipboard.min';
import xmlfmt from 'xmlfmt';
import $ from 'jquery';
// require('bs-tooltip');
// import 'bs-util';
// import Util from 'bs-util';
// import Tooltip from 'bs-tooltip';
// require('bootstrap/js/dist/util.js');
require('bootstrap/dist/js/bootstrap.min.js');

let $styleGuideItems = $('[data-style-guide-item]');

if ($styleGuideItems.length > 0) {

    // tooltips
    // http://stackoverflow.com/questions/37381640/tooltips-highlight-animation-with-clipboard-js-click/37395225#answer-37395225
    function setTooltip(btn, message) {
        $(btn).tooltip('hide')
            .attr('data-original-title', message)
            .tooltip('show');
    }
    function hideTooltip(btn) {
        setTimeout(function() {
            $(btn).tooltip('hide');
        }, 1000);
    }
    // end tooltips

    const escapeHTML = (s) => {
        return s.replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    };

    // http://stackoverflow.com/questions/6628019/string-processing-to-add-trailing-slash-to-self-closing-tags-img-br-etc
    // innerHTML method defaults to not keeping closing slash on self closing tags
    // this causes issues with xmlfmt, as without the closing slash the whitespace is incorrect
    const addClosingSlashes = (htmlString) => {
        var elemTypes = [
        "area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta", "param", "source"];
        var inString, outString = htmlString;
        for (var i=0; i<elemTypes.length; i++) {
          var index1 = 0, index2;
          inString = outString;
          outString = '';
          while ((index1 = inString.indexOf("<" + elemTypes[i])) != -1) {
            if ((index2 = inString.indexOf(">", index1)) != -1 && inString.substring(index2 - 1, index2 + 1) != '/>') {
              outString += inString.substring(0, index2) + " />";
              inString = inString.substring(index2+1);
              }
            else {
              break;
              }
            }
          outString += inString;
          }
        return outString;
    };

    $styleGuideItems.each(function(index) {
        let $item = $(this);
        let $itemClone = $item.clone();
        $itemClone.children('label').remove();
        let itemHtml = $itemClone.html();
        let renderText = escapeHTML(xmlfmt(addClosingSlashes(itemHtml)));
        $item.find('code').html(renderText);
    });

    const clipboard = new Clipboard(`.${prefix('style-guide-item')} .btn`, {
        target: function(trigger) {
            return trigger.nextElementSibling;
        }
    });

    $(`.${prefix('style-guide-item')} .btn`).tooltip({
        trigger: 'click',
        placement: 'bottom'
    });

    clipboard.on('success', function(e) {
        setTooltip(e.trigger, 'Copied!');
        hideTooltip(e.trigger);
    });

    clipboard.on('error', function(e) {
        setTooltip(e.trigger, 'Failed!');
        hideTooltip(e.trigger);
    });

}
