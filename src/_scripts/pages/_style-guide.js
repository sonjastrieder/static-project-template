// this generates html for the style guide / pattern library elements, groups, components, modules
// an element, group, component, or module needs to have a top-level html element, because $.html() selects the first element, so if there are siblings, will only select the first

import {prefix} from '../utilities/_helpers';
import Prism from 'prismjs';
import Clipboard from 'clipboard/dist/clipboard.min';
import xmlfmt from 'xmlfmt';

let $styleGuideItems = $('[data-style-guide-item]');

if ($styleGuideItems.length > 0) {

    const escapeHTML = (s) => {
        return s.replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    };

    $styleGuideItems.each(function(index) {
        let $item = $(this);
        let $itemClone = $item.clone();
        $itemClone.children('label').remove();
        let itemHtml = $itemClone.html();
        let renderText = escapeHTML(xmlfmt(itemHtml));
        $item.find('code').html(renderText);
    });

    new Clipboard(`.${prefix('style-guide-item')} .btn`, {
        target: function(trigger) {
            return trigger.nextElementSibling;
        }
    });

}
