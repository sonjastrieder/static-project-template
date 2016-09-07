# Images

This images folder and it's childer icons folder is designated for your image assets.

Non-icon assets should be placed in the root images folder or any child folder structure needed that is not the child icons folder. Images with the extension (jpg|jpeg|gif|svg|png) will be optimized and placed into identical folder structure in the output folder.

SVG icon usage is the standard best practice approach that provides great flexibility, support, customization and optimization. Place SVG icons in the child icons folder using a lowercase and dash spaced file name. All SVG icons are heavily optimized and combined into a single SVG symbol sprite. This sprite is not output into the images folder. It is, instead, included inline as part of `base.pug` template. An additional sprite SCSS file is generated with cooresponding classes (`icon-` + file name). Use the `e-icon` mixin with the file name passed in as a string.

[Documentation on SVG Symbol & Use](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/symbol)