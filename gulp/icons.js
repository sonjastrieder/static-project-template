'use strict';

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
            // ,
            // transform the svg sprite
            // transform:[
            //     function(svg) {
            //         var DOMParser = require('xmldom').DOMParser;
            //         svg = new DOMParser().parseFromString(svg);
            //         svg.documentElement.setAttribute('width','120');
            //         return svg.toString();
            //     }
            // ]
        },
        shape: {
            dimension: {
                maxWidth: 10
            },
            spacing: {
                padding: 0
            },
            // center icons
            align: 'gulp/icons/shape.yaml'
            // ,
            // this didn't work, but seems close to working, so keeping it for now
            // transform: [
            //     {
            //         custom: function(shape, sprite, callback) {
            //             var DOMParser = require('xmldom').DOMParser;
            //             var svg = new DOMParser().parseFromString(shape.svg.current);
            //             svg.documentElement.setAttribute('width','10');
            //             shape.svg.current = svg.toString();
            //             // console.log(shape);
            //             callback(null);
            //         }
            //     }
            // ]
        }
    };

    gulp.task('icons', () => {
        return gulp
            .src('./src/_images/icons/**/*.svg')
            .pipe(svgSprite(svgConfig))
            .pipe(gulp.dest('./tmp/images/icons'));
    });
}
