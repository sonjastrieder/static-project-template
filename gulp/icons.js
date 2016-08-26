'use strict';

import path from 'path';

export default function(gulp, plugins, args, config, taskTarget, browserSync) {
    let dirs = config.directories;
    let options = {
        'mode': {
            // Create a CSS sprite
            'css': {
                'dest': dirs.images,
                'prefix': '.#{$prefix}-icon-%s',
                'sprite': 'sprite.svg',
                'bust': false,
                'layout': 'vertical',
                'render': {
                    'scss': {
                        'template': path.join('gulp', 'icons', 'sprite.scss'),
                        'dest': path.join('..', dirs.styles, 'elements', 'sprite.scss')
                    }
                }
            }
        },
        'svg': {
            'xmlDeclaration': false, // strip out the XML attribute
            'doctypeDeclaration': false // don't include the !DOCTYPE declaration
        },
        'shape': {
            'dimension': {
                'maxWidth': 10
            },
            'spacing': {
                // without this amount of padding, there are many overlap issues where a different icon bleeds into current icon
                // works in conjunction with the background-size being set to 110% in gulp/icons/sprite.scss
                // try setting to zero and running this task, view in win10 FF or some Android devices
                'padding': 1
            },
            // center icons
            'align': path.join('gulp', 'icons', 'shape.yaml'),
            'transform': [
                {
                    'svgo': {
                        'plugins': [
                            {
                                'removeStyleElement': true
                            },
                            {
                                'removeUselessDefs': true
                            }
                        ]
                    }
                }
            ]
        }
    };
    
    // generates an svg sprite and an accompanying sass file
    // the sprite is located in tmp/images/icons/css/

    gulp.task('icons', () => {
        return gulp
            .src(path.join(dirs.source, dirs.images, 'icons', '**', '*.svg'))
            .pipe(plugins.svgSprite(options))
            .pipe(gulp.dest(dirs.source));
    });
}