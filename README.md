# hexo-renderer-webpack

Add Hexo support for Webpack.

## Install

``` bash
$ npm install hexo-renderer-webpack --save
```

## Options

You can configure this plugin in `_config.yml` or your theme's `_config.yml`.

``` yaml
webpack:
  entry: 'themes/my-theme/source/js/app.js'
```

or

``` yaml
webpack:
  entry:
    - 'themes/my-theme/source/js/app.js'
    - 'themes/my-theme/source/js/lib.js'
```

## Links

- Hexo: https://hexo.io/
- Webpack: http://webpack.github.io/
