'use strict';

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import browserSyncLib from 'browser-sync';
import pjson from './package.json';
import minimist from 'minimist';
import wrench from 'wrench';

// Load all gulp plugins based on their names
// EX: gulp-copy -> copy
const plugins = gulpLoadPlugins();

const defaultNotification = function(err) {
    return {
        'subtitle': err.plugin,
        'message': err.message,
        'sound': 'Funk',
        'onLast': true,
    };
};

let config = Object.assign({}, pjson.config, defaultNotification);

let args = minimist(process.argv.slice(2));
let dirs = config.directories;
let taskTarget = args.production ? dirs.destination : dirs.temporary;

// Create a new browserSync instance
let browserSync = browserSyncLib.create();

// This will grab all js in the `gulp` directory
// in order to load all gulp tasks
wrench.readdirSyncRecursive('./gulp')
    .filter((file) => {
        return (/\.(js)$/i).test(file);
    })
    .map(function(file) {
        require('./gulp/' + file)(gulp, plugins, args, config, taskTarget, browserSync);
    });

// Build production-ready code
gulp.task('forge', [
    'copy',
    'imagemin',
    'jade',
    'sass',
    'browserify'
]);

// Server tasks with watch
gulp.task('draft', [
    'imagemin',
    'copy',
    'jade',
    'sass',
    'browserify',
    'browserSync',
    'watch'
]);

// Testing
gulp.task('test', ['eslint']);

gulp.task('build', ['clean'], () => {
    gulp.start('forge');
});

// Default task
gulp.task('default', ['clean'], () => {
    gulp.start('draft');
});