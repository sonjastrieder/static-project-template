// this generates html for the style guide / pattern library elements, groups, components, modules

import {prefix} from './_helpers';

let $generatedHtml = $('[data-generated-html]');

if ($generatedHtml.length > 0) {

    require('prismjs');
    require('prismjs/components/prism-jade');
    let Clipboard = require('clipboard/dist/clipboard.min');
    let beautifyHTML = require('xmlfmt');

    const escapeHTML = (s) => {
        return s.replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
    };

    $generatedHtml.each(function() {

        let $html = $(this);

        let renderText =  escapeHTML(beautifyHTML($html.find('.render').html()));

        $html.find('code.language-html').html(renderText);
    });

    new Clipboard(`.${prefix('guide-example')} .btn`);

}
