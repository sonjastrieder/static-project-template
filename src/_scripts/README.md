# Scripts

This scripts folder is designated for all of your global script files.
The key files in this folder are `main.custom.js` and `main.vendor.js` and are included in the `base.pug` file

By default, ES6/2015 features are enabled in your scripts by using [Babel](https://babeljs.io)

## Adding third-party script libraries
Odds are that you will need to add some third party libraries to your project at some point. 
To do so, it is strongly recommended that you install them using [NPM](http://npmjs.com/):

```
npm install [package name] --save
```

Once installed, you can access scripts within your JavaScript files like so:

```js
import _ from 'lodash';

console.log(_.now());
```

#### Using Non-CommonJS modules with browserify-shim

Sometimes you need to use libraries that attach themselves to the window object and don't work with browserify very well.
In this case, you can use a transform called [browserify-shim](https://github.com/thlorenz/browserify-shim).
Browserify doesn't support Non-CommonJS scripts out of the box (jQuery plugins, window.* libs, etc), but you can use a transform called 'browserify-shim' to remedy that:

***Step 1: Install desired npm package***

Now you can install your desired npm package:

```
// Example: jQuery plugin

npm install [package name] --save
```

***Step 1: Setup browserify-shim***

Add the following to your `package.json` file:

```json
"browser": {
    "package-name": "./node_modules/package-name/dist/package.min.js"
},
"browserify-shim": {
    "package-name": {
        "exports": "PackageName",
        "depends": [
			"jquery:$"
		]
    }
}
```

***Step 2: Import file to your project***

Now you can include your desired module/lib within your `src/_scripts/main.js` file:

```js
// ES6
import 'package-name';

$('...').packageName();
```

Due to some jQuery plugins not behaving correctly even after following the above steps, jQuery has been added as an external CDN global dependency.