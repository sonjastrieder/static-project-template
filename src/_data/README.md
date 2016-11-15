# Data

This "Data" folder is the designated location for `json` file data
that will be injected into your templates under the `self.data` property.

## Pages

The data files found in the pages folder are handled uniquely. To allow for dynamic page generation with generic templates create a data file in the pages folder.

Optional properties: `layout`, `path`, `title`

The page layout defaults to using "shell.pug" but can be overwritten to point to any file in the layouts folder.

The path for a page defaults to the data file's name. This can be overwritten via the `path` property. Set a folder structure string, ex: "/foo/bar"

The page title defaults to the global title but can be page specific by using the `title` property.

### Mixins

To call a mixin, use the `"+[initial]-[name]"` syntax. All mixins should accept object notation and some will accept a String or Number as a shorthand. Look to individual mixin documentation for supported configuration. 

### Blocks

To call a block, use the `"block": "[name]"` syntax. The `name` must match the name of the desired block, otherwise nothing will be rendered.

### Elements

When you need to implement generic content you can call elements in a similar fashion to mixins. The difference is that there is no `initial` prefix and a single modifier class can be applied. Examples:

    "+h1": "..."

    "+p": {
		"content": "...",
		"+small": "..."
    }

### Attributes

It's often necessary to pass additional classes, use prefixed classes, and/or add other attributes such as data/aria. By passing an object to a mixin or element, a child `attrs` object can be passed in.

    "+a": {
		"attrs": {
			"class": "btn btn-primary",
			"prefix": "foo bar",
			"href": "javascript:void(0)"
		},
		"content": "Example"
	}

Renders:

    <a href="javascript:void(0)" class="btn btn-primary fs-foo fs-bar">Example</a>

#### Data/Aria

For more complicated attributes, it's possible to pass nested objects. These objects will be flattened, with their keys being concatenated.

    "+div": {
        "attrs": {
            "data": {
                "equal": {
                    "group": "example",
                    "min": 768
                }
            }
        }
    }

Renders:

    <div data-equal-group="example" data-equal-min="768"></div>

However, there are times when you want to be able to pass config objects that don't get flattened, such as for the carousel.

    "+c-carousel": {
        "attrs": {
            "!carousel": {
                "slidesToShow": 1,
                "arrows": false
            }
        },
        "slides": [...]
    }

Notice the "!" preceeding the "carousel" key, this tells the attrs utility to leave the value object alone.

### Content

To render text directly use the "content" key. These can be used multiple times within the same object and render in the same order as specified so feel free to mix in other blocks, mixins, and elements.

### Invalid JSON

As you've likely noticed, the JSON supports identical keys which normally wouldn't work. This is because all JSON files are modified in memory to add tilda indexing to keys. This approach applies to all "+", "block", and "content" keys.