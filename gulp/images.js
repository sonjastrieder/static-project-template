'use strict';

import path from 'path';
import pngquant from 'imagemin-pngquant';

export default function(gulp, plugins, args, config, taskTarget, browserSync) {
    let dirs = config.directories;
    let dest = path.join(taskTarget, dirs.images.replace(/^_/, ''));

    gulp.task('images', () => {
        return gulp
            .src([
                path.join(dirs.source, dirs.images, '**/*.{jpg,jpeg,gif,svg,png}'),
                '!' + path.join(dirs.source, dirs.images, 'icons', '**', '*.svg')
            ])
            .pipe(plugins.changed(dest))
            .pipe(plugins.if(args.production, plugins.imagemin({
                'progressive': true,
                'svgoPlugins': [{'removeViewBox': false}],
                'use': [pngquant({speed: 10})]
            })))
            .pipe(gulp.dest(dest));
    });
}