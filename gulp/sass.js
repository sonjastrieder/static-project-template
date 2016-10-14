'use strict';

import path from 'path';
import autoprefixer from 'autoprefixer';

export default function(gulp, plugins, args, config, taskTarget, browserSync) {
    let dirs = config.directories;
    let entries = config.entries;
    let dest = path.join(taskTarget, dirs.styles.replace(/^_/, ''));

    gulp.task('sass', () => {
        return gulp
            .src(path.join(dirs.source, dirs.styles, entries.css))
            .pipe(plugins.plumber())
            .pipe(plugins.sourcemaps.init())
            .pipe(plugins.sass({
                'outputStyle': 'expanded',
                'precision': 10,
                'includePaths': [
                    path.join(dirs.source, dirs.styles)
                ]
            }))
            .on('error', (err) => {
                plugins.util.log(err);
            })
            .on('error', plugins.notify.onError(config.defaultNotification))
            .pipe(plugins.postcss([autoprefixer({
                'browsers': ['last 2 version', '> 5%', 'safari 5', 'ios 6', 'android 4']
            })]))
            .pipe(plugins.rename((path) => {
                // Remove 'source' directory as well as prefixed folder underscores
                // Ex: 'src/_styles' --> '/styles'
                path.dirname = path.dirname.replace(dirs.source, '').replace('_', '');
            }))
            .pipe(plugins.if(args.production, plugins.cssnano({
                'rebase': false
            })))
            .pipe(plugins.sourcemaps.write('./'))
            .pipe(gulp.dest(dest))
            .pipe(browserSync.stream({match: '**/*.css'}));
    });
}