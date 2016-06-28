# Static Project Template

## Technologies used

JavaScript
- [Browserify](http://browserify.org/) with ES6/2015 support through [Babel](https://babeljs.io/)
- [Node](https://nodejs.org/)

Styles
- [Sass](http://sass-lang.com/) via ([node-sass](https://github.com/sass/node-sass))

Markup
- [Jade](http://jade-lang.com/)

Optimization
- [Imagemin](https://github.com/imagemin/imagemin)
- [Uglify](https://github.com/mishoo/UglifyJS)

Server
- [BrowserSync](http://www.browsersync.io/)

Linting
- [ESlint](http://eslint.org/)

Automation
- [Gulp](http://gulpjs.com)

Code Management
- [Editorconfig](http://editorconfig.org/)
- [Git](https://git-scm.com/)


## Automated tasks

This project uses [Gulp](http://gulpjs.com) to run automated tasks for development and production builds.
The tasks are as follows:

`gulp`: Compiles preprocessors and boots up development server
`gulp --open`: Same as `gulp` but will also open up site/app in your default browser
`gulp --production`: Same as `gulp` but will run all production tasks so you can view the site in it's final optimized form

`gulp test`: Lints all `*.js` file in the `source` folder using eslint

`gulp build --production`: Same as `gulp --production` but will not boot up server

***Adding the `--debug` option to any gulp task displays extra debugging information (ex. data being loaded into your templates)***
