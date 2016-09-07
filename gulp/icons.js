'use strict';

import path from 'path';

export default function(gulp, plugins, args, config, taskTarget, browserSync) {
    let dirs = config.directories;
    let options = {
        'mode': {
            'symbol': {
                'dest': dirs.templates,
                'sprite': 'sprite.svg',
                'bust': false,
                'layout': 'vertical',
                'prefix': '%s',
                'dimensions': true,
                'render': {
                    'scss': {
                        'template': path.join('gulp', 'icons', 'sprite.scss'),
                        'dest': path.join('..', dirs.styles, 'elements', 'sprite.scss')
                    }
                }
            }
        },
        'svg': {
            'xmlDeclaration': false,
            'doctypeDeclaration': false
        },
        'shape': {
            'id': {
                'generator': (name) => {
                    name = name.replace(/\.svg/, '');

                    return `icon-${name}`;
                }
            },
            'align': path.join('gulp', 'icons', 'shape.yaml'),
            'dimension': {
                'maxWidth': 10
            },
            'transform': [
                {
                    'svgo': {
                        'plugins': [
                            {'removeTitle': true},
                            {'removeDesc': true},
                            {'removeComments': true},
                            {'removeMetadata': true},
                            {'removeAttrs': {'attrs': '(id|class|data-[^=]+)'}},
                            {'removeStyleElement': true},
                            {'removeHiddenElems': true},
                            {'removeUselessDefs': true},
                            {'removeEmptyContainers': true}
                        ]
                    }
                }
            ]
        }
    };

    gulp.task('icons', () => {
        return gulp
            .src(path.join(dirs.source, dirs.images, 'icons', '**', '*.svg'))
            .pipe(plugins.svgSprite(options))
            .pipe(gulp.dest(dirs.source));
    });
}