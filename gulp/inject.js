'use strict';

import path from 'path';

export default function(gulp, plugins, args, config, taskTarget, browserSync) {
    let dirs = config.directories;

    gulp.task('inject', () => {
        return gulp
            .src(path.join(dirs.source, dirs.templates, 'utilities', '_includes.pug'))
            .pipe(plugins.inject(gulp.src([
                path.join(dirs.source, dirs.templates, '**/*.pug'),
                '!' + path.join(dirs.source, dirs.templates, 'layouts', '**/*.pug'),
                '!' + path.join(dirs.source, dirs.templates, 'utilities', '**/*.pug'),
            ], {
                'read': false
            }), {
                'empty': true,
                'relative': true
            }))
            .pipe(gulp.dest(path.join(dirs.source, dirs.templates, 'utilities')))
    });
}