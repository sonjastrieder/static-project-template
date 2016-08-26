/*eslint no-process-exit:0 */

'use strict';

import path from 'path';

export default function(gulp, plugins, args, config, taskTarget, browserSync) {
    let dirs = config.directories;

    gulp.task('eslint', () => {
        return gulp
            .src([
                path.join('gulpfile.js'),
                path.join(dirs.source, '**/*.js'),
                // Ignore all vendor folder files
                '!' + path.join('**/vendor/**', '*')
            ])
            .pipe(browserSync.reload({
                'stream': true,
                'once': true
            }))
            .pipe(plugins.eslint({
                'useEslintrc': true
            }))
            .pipe(plugins.eslint.format())
            .pipe(plugins.if(!browserSync.active, plugins.eslint.failAfterError()))
            .on('error', () => {
                if (!browserSync.active) {
                    process.exit(1);
                }
            });
    });
}