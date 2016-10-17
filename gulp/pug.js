'use strict';

import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import foldero from 'foldero';
import pug from 'pug';
import yaml from 'js-yaml';

export default function(gulp, plugins, args, config, taskTarget, browserSync) {
    let dirs = config.directories;
    let dest = path.join(taskTarget);
    let dataPath = path.join(dirs.source, dirs.data);

    let ensureDirectoryExistence = (filePath) => {
        let dirname = path.dirname(filePath);

        if (directoryExists(dirname)) {
            return true;
        }

        ensureDirectoryExistence(dirname);

        fs.mkdirSync(dirname);
    }

    let directoryExists = (path) => {
        try {
            return fs.statSync(path).isDirectory();
        } catch (err) {
            return false;
        }
    }

    gulp.task('pug', () => {
        let data = {};
        let pages = [];

        if (fs.existsSync(dataPath)) {
            // Convert directory to JS Object
            data = foldero(dataPath, {
                'recurse': true,
                'whitelist': '(.*/)*.+\.(json|ya?ml)$',
                loader: (file) => {
                    let json = {};

                    try {
                        if (path.extname(file).match(/^.ya?ml$/)) {
                            json = yaml.safeLoad(fs.readFileSync(file, 'utf8'));
                        } else {
                            json = JSON.parse(fs.readFileSync(file, 'utf8'));
                        }

                        if (/[\\/]pages[\\/]/.test(file)) {
                            let fileName = file.replace(/^[\w\\/]+[\\/]([\w-]+)\.(?:json|ya?ml)$/, '$1');

                            json.path = json.path || fileName;

                            if (!args.hasOwnProperty('page') || (args.hasOwnProperty('page') && args.page === fileName)) {
                                pages.push({
                                    'data': json,
                                    'template': path.join('src', '_templates', 'layouts', `${json.layout || path.join('generic', 'shell')}.pug`),
                                    'path': path.join(dest, json.path, 'index.html')
                                });
                            }
                        }
                    } catch(e) {
                        console.log('Error Parsing DATA file: ' + file);
                        console.log('==== Details Below ====');
                        console.log(e);
                    }

                    return json;
                }
            });
        }

        let options = {
            'pug': pug,
            'self': true,
            'pretty': true
        };
        let locals = {
            'config': config,
            'debug': true,
            'data': data
        };

        if (pages.length) {
            let merged = _.merge(options, locals, {
                'debug': false,
                'compileDebug': false
            })

            pages.forEach((page) => {
                ensureDirectoryExistence(page.path);

                fs.writeFileSync(page.path, pug.renderFile(page.template, _.merge({}, merged, {'page': page.data})))
            });
        }

        // Add --debug option to your gulp task to view
        // what data is being loaded into your templates
        if (args.debug) {
            console.log('==== DEBUG: data being injected to templates ====');
            console.log(data);
            console.log('\n==== DEBUG: package.json config being injected to templates ====');
            console.log(config);
        }

        return gulp
            .src([
                path.join(dirs.source, '**/*.pug'),
                '!' + path.join(dirs.source, '{**/\_*,**/\_*/**}')
            ])
            .pipe(plugins.changed(dest))
            .pipe(plugins.plumber())
            .pipe(plugins.pug(_.extend({}, options, {'locals': locals})))
            .pipe(plugins.htmlmin({
                'collapseBooleanAttributes': true,
                'conservativeCollapse': true,
                'removeCommentsFromCDATA': true,
                'removeEmptyAttributes': true,
                'removeRedundantAttributes': true
            }))
            .pipe(gulp.dest(dest))
            .on('end', browserSync.reload);
    });
}