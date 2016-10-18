'use strict';

export default function(gulp, plugins, args, config, taskTarget, browserSync) {
    let dirs = config.directories;

    gulp.task('watch', () => {
        if (!args.production) {
            // Icons
            gulp.watch([
                `${dirs.source}/${dirs.images}/**/*.svg`
            ], () => {
                plugins.runSequence('icons');
            });

            // Styles
            gulp.watch([
                `${dirs.source}/${dirs.styles}/**/*.{scss,sass}`
            ], () => {
                plugins.runSequence('sass');
            });

            // Templates
            gulp.watch([
                `${dirs.source}/**/*.pug`,
                `${dirs.source}/${dirs.templates}/*.svg`,
                `${dirs.source}/${dirs.data}/**/*.json`,
                `!${dirs.source}/${dirs.templates}/utilities/includes.pug`
            ], () => {
                plugins.runSequence('inject', 'pug');
            });

            // Copy
            gulp.watch([
                `${dirs.source}/**/*`,
                `!${dirs.source}/**/*.{scss,sass,js,jpg,jpeg,gif,svg,png,pug}`,
                `!${dirs.source}/{**/\_*,**/\_*/**}`
            ], () => {
                plugins.runSequence('copy');
            });

            // Images
            gulp.watch([
                `${dirs.source}/${dirs.images}/**/*.{jpg,jpeg,gif,svg,png}`,
                `!${dirs.source}/${dirs.images}/icons/**/*.svg`
            ], () => {
                plugins.runSequence('images');
            });

            // All other files
            gulp.watch([
                `${dirs.temporary}/**/*`,
                `!${dirs.temporary}/**/*.{css,map,html,js}`
            ]).on('change', browserSync.reload);
        }
    });
}