// this generates html for the style guide / pattern library elements, groups, components, modules

import {prefix} from '../utilities/_helpers';

let $styleGuideItems = $('[data-style-guide-item]');

if ($styleGuideItems.length > 0) {

    let hljs = require('highlightjs');
    let Clipboard = require('clipboard/dist/clipboard.min');

    $styleGuideItems.each(function(index) {
        let $item = $(this);
        let itemHtml = $item.html();
        let highlightedHtml = hljs.highlight('html', itemHtml);
        let styleGuideItem = `
            <button class="btn" data-clipboard-target="#style-guide-item-${index}">Copy</button>
            <pre>
                <code class="hljs" id="style-guide-item-${index}">
                    ${highlightedHtml.value}
                </code>
            </pre>
        `;
        $item.append(styleGuideItem);
    });

    new Clipboard(`.${prefix('style-guide-item')} .btn`);

}
