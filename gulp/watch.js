'use strict';

import path from 'path';

export default function(gulp, plugins, args, config, taskTarget, browserSync) {
    let dirs = config.directories;

    gulp.task('watch', () => {
        if (!args.production) {
            // Styles
            gulp.watch([
                path.join(dirs.source, dirs.styles, '**/*.{scss,sass}')
            ], ['sass']);

            // Pug Templates
            gulp.watch([
                path.join(dirs.source, '**/*.pug'),
                path.join(dirs.source, dirs.data, '**/*.{json,yaml,yml}')
            ], ['inject', 'pug']);

            // Copy
            gulp.watch([
                path.join(dirs.source, '**/*'),
                '!' + path.join(dirs.source, '{**/\_*,**/\_*/**}'),
                '!' + path.join(dirs.source, '**/*.pug')
            ], ['copy']);

            // Images
            gulp.watch([
                path.join(dirs.source, dirs.images, '**/*.{jpg,jpeg,gif,svg,png}')
            ], ['imagemin']);

            // All other files
            gulp.watch([
                path.join(dirs.temporary, '**/*'),
                '!' + path.join(dirs.temporary, '**/*.{css,map,html,js}')
            ]).on('change', browserSync.reload);
        }
    });
}