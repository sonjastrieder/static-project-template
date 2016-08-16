'use strict';

import path from 'path';
import svgSprite from 'gulp-svg-sprite';

export default function(gulp, plugins, args, config, taskTarget, browserSync) {
    let svgConfig = {
        // mode: {
        //     symbol: { // symbol mode to build the SVG
        //         sprite: 'sprite.svg', //sprite name
        //         example: true // Build sample page
        //     }
        // },
        mode: {
            // Create a «css» sprite
            css: {
                prefix: '.fs-icon-%s',
                sprite: 'sprite.svg',
                bust: false,
                render: {
                    // Render a Sass stylesheet
                    scss: {
                        template: 'gulp/sprite.scss'
                    }
                }
            }
        },
        svg: {
            xmlDeclaration: false, // strip out the XML attribute
            doctypeDeclaration: false // don't include the !DOCTYPE declaration
        }
    };

    gulp.task('icons', () => {
        return gulp
            .src('./src/_images/icons/**/*.svg')
            .pipe(svgSprite(svgConfig))
            .pipe(gulp.dest('./tmp/images/icons'));
    });
}
