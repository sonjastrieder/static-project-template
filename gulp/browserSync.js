'use strict';

export default function(gulp, plugins, args, config, taskTarget, browserSync) {
    gulp.task('browserSync', () => {
        browserSync.init({
            'open': args.open ? 'local' : false,
            'startPath': config.baseUrl,
            'port': config.port || 3000,
            'notify': false,
            'server': {
                'baseDir': taskTarget,
                'routes': (() => {
                    let routes = {};

                    // Map base URL to routes
                    routes[config.baseUrl] = taskTarget;

                    return routes;
                })()
            }
        });
    });
}