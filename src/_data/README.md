# Data

This "Data" folder is the designated location for `json` file data
that will be injected into your templates under the `site.data` property.

## Example

If you have two data files in this data folder with the following contents:

```
└── _data
    ├── global.json
    └── menu.json
```

***global.json***

```json
{
    "title": "Static Project Template",
    "description": ""
}
```

***menu.json***

```json
[{
  "name": "Home"
},{
  "name": "About"
}]
```

They would be converted to the following object:

```js
{
  menu: [{
    name: "Home"
  }, {
    name: "About"
  }],
  global: {
    siteName: "Sample"
  }
}
```

And would then be injected into your template within the `data` property
so you could access your data like so:

```jade
h1= data.global.siteName //- Sample
ul.menu
    each val in data.menu
        li= val.name //- Home, About
```

## Pages

The data files found in the pages folder are handled uniquely. To allow for dynamic page generation with generic templates create a data file in the pages folder.

Optional properties: `layout`, `path`, `title`

The page layout defaults to using "+shell.pug" but can be overwritten to point to any file in the layouts folder.

The path for a page defaults to the data file's name. This can be overwritten via the `path` property. Set a folder structure string, ex: "/foo/bar"

The page title defaults to the global title but can be page specific by using the `title` property.