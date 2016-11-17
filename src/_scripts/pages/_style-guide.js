// this generates html for the style guide / pattern library elements, groups, components, modules
// an element, group, component, or module needs to have a top-level html element, because $.html() selects the first element, so if there are siblings, will only select the first

import {prefix} from '../utilities/_helpers';

let $styleGuideItems = $('[data-style-guide-item]');

if ($styleGuideItems.length > 0) {

    require('prismjs');
    let Clipboard = require('clipboard/dist/clipboard.min');
    let beautifyHTML = require('xmlfmt');
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
        let renderText = escapeHTML(beautifyHTML(itemHtml));
        let $styleGuideItem = $(`
            <div class="fs-style-guide-item-html">
                <button class="btn btn-primary" data-clipboard-target="#style-guide-item-${index}">Copy</button>
                <pre class="language-html">
                    <code class="language-html" id="style-guide-item-${index}"></code>
                </pre>
            </div>
        `);
        $item.append($styleGuideItem);
        $styleGuideItem.find('code').html(renderText);
    });

    new Clipboard(`.${prefix('style-guide-item')} .btn`);

}
