'use strict';

import gulp from 'gulp';
import runSequence from 'gulp-run-sequence';
import loadPlugins from 'gulp-load-plugins';
import browserSyncLib from 'browser-sync';
import minimist from 'minimist';
import wrench from 'wrench';

import json from './package.json';

// Load all gulp plugins based on their names
// EX: gulp-copy -> copy
const plugins = loadPlugins();

const defaultNotification = function(err) {
    return {
        'subtitle': err.plugin,
        'message': err.message,
        'sound': 'Funk',
        'onLast': true,
    };
};

let config = Object.assign({}, json.config, defaultNotification);

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

gulp.task('compile', (done) => {
    runSequence('copy', 'images', 'icons', 'sass', 'inject', 'pug', 'browserify', done);
});

gulp.task('dev', (done) => {
    runSequence('compile', 'browserSync', 'watch', done);
});

// Testing
gulp.task('test', ['eslint']);

gulp.task('build', (done) => {
    runSequence('clean', 'compile', done);
});

// Default task
gulp.task('default', (done) => {
    runSequence('clean', 'dev', done);
});