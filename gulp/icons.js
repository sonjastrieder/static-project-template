'use strict';

// generates an svg sprite and an accompanying sass file
// the sprite is located in tmp/images/icons/css/

import path from 'path';
import svgSprite from 'gulp-svg-sprite';

export default function(gulp, plugins, args, config, taskTarget, browserSync) {
    let svgConfig = {
        mode: {
            // Create a «css» sprite
            css: {
                prefix: '.fs-icon-%s',
                sprite: 'sprite.svg',
                bust: false,
                layout: 'vertical',
                render: {
                    // Render a Sass stylesheet
                    scss: {
                        template: 'gulp/icons/sprite.scss'
                    }
                }
            }
        },
        svg: {
            xmlDeclaration: false, // strip out the XML attribute
            doctypeDeclaration: false // don't include the !DOCTYPE declaration
        },
        shape: {
            dimension: {
                maxWidth: 10
            },
            spacing: {
                // without this amount of padding, there are many overlap issues where a different icon bleeds into current icon
                // works in conjunction with the background-size being set to 110% in gulp/icons/sprite.scss
                // try setting to zero and running this task, view in win10 FF or some Android devices
                padding: 1
            },
            // center icons
            align: 'gulp/icons/shape.yaml'
            ,
            transform: [
                {
                    svgo: {
                        plugins: [
                            {removeStyleElement: true},
                            {removeUselessDefs: true}
                        ]
                    }
                }
            ]
        }
    };

    gulp.task('icons', () => {
        return gulp
            .src('./src/_images/icons/**/*.svg')
            .pipe(svgSprite(svgConfig))
            .pipe(gulp.dest('./tmp/images/icons'));
    });
}
