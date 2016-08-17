'use strict';

// generates an svg sprite and an accompanying sass file
// the sprite is located in tmp/images/icons/css/

import path from 'path';
import svgSprite from 'gulp-svg-sprite';
import cheerio from 'gulp-cheerio';
import xmldom from 'xmldom';


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
        }
    };

    gulp.task('icons', () => {
        return gulp
            .src('./src/_images/icons/**/*.svg')
            // set widths and heights of svgs
            // .pipe(cheerio({
            //     run: function ($, file) {
            //         var svg = $('svg');
            //         console.log(svg);
            //         var viewbox = svg[0].attribs.viewbox;
            //         var coordinates = viewbox.split(" ");
            //         var width = coordinates[2];
            //         var height = coordinates[3];
            //         var newHeight = Math.round(height/width * 10).toString();
            //         svg[0].attribs.width = "10";
            //         coordinates[2] = "10";
            //         svg[0].attribs.height = newHeight;
            //         coordinates[3] = newHeight;
            //         console.log('coordinates are ' + coordinates);
            //         console.log('coordinates string is ' + coordinates.join(" "));
            //         svg[0].attribs.viewbox = coordinates.join(" ");
            // }}))
            .pipe(svgSprite(svgConfig))
            .pipe(gulp.dest('./tmp/images/icons'));
    });
}
