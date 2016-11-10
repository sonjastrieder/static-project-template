'use strict';

import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import foldero from 'foldero';
import pug from 'pug';

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
                'whitelist': '(.*/)*.+\.json$',
                loader: (file) => {
                    let json = {};

                    try {
                        let content = fs.readFileSync(file, 'utf8');
                        let index = 0;

                        json = JSON.parse(content.replace(/"(\+[^"]+|content|block)"/g, (match, key) => `"${key}~${index++}"`));

                        if (/[\\/]pages[\\/]/.test(file)) {
                            let fileName = file.replace(/^[\w\\/]+[\\/]([\w-]+)\.(?:json)$/, '$1');

                            json.path = json.path || fileName;

                            if (!args.hasOwnProperty('page') || (args.hasOwnProperty('page') && args.page === fileName)) {
                                pages.push({
                                    'data': json,
                                    'template': path.join(dirs.source, dirs.templates, 'layouts', `${json.layout || '+shell'}.pug`),
                                    'path': path.join(dest, json.path, 'index.html')
                                });
                            }
                        }
                    } catch(e) {
                        console.log('Error Parsing JSON file: ' + file);
                        console.log('==== Details Below ====');
                        console.log(e);
                    }

                    return json;
                }
            });
        }

        let options = {
            'pug': pug,
            'self': true
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
                '!' + path.join(dirs.source, dirs.templates, '**/*.pug')
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