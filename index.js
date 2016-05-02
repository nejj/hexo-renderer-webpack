var webpack = require('webpack');
var extend = require('util')._extend;
var fs = require('fs');
var path = require('path');

var renderer = function(data, options, callback) {

  var userConfig = extend(
    hexo.theme.config.webpack || {},
    hexo.config.webpack || {}
  );

  if (data.path !== process.cwd() + '/' + userConfig.entry) return callback(null, data.text);

  var config = extend({}, userConfig);

  config = extend(config, {
    entry: process.cwd() + '/' + userConfig.entry,
    output: {
      path: hexo.config.public_dir + '/js-webpack',
      filename: path.basename(data.path),
    }
  });

  var compiler = webpack(config);

  compiler.run(function(err, stats) {
    if (stats.toJson().errors.length > 0) return callback(stats.toJson().errors, 'Webpack Error.')
    return callback(null, data.text);
  });

};

hexo.extend.renderer.register('js', 'js', renderer);
