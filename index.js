var webpack = require('webpack');
var extend = require('util')._extend;
var path = require('path');
var os = require('os');
var MemoryFS = require("memory-fs");
var fs = new MemoryFS();

var TMP_PATH = os.tmpdir();

var renderer = function(data, options, callback) {

  var userConfig = extend(
    hexo.theme.config.webpack || {},
    hexo.config.webpack || {}
  );

  //
  // If this file is not a webpack entry simply return the file.
  //
  if (data.path !== path.join(process.cwd(), userConfig.entry)) {
    return callback(null, data.text);
  }

  //
  // Copy config then extend it with some defaults.
  //
  var config = extend({}, userConfig);

  config = extend(config, {
    entry: path.join(process.cwd(), userConfig.entry),
    output: {
      path: TMP_PATH,
      filename: path.basename(data.path),
    }
  });

  //
  // Setup compiler to use in-memory file system then run it.
  //
  var compiler = webpack(config);
  compiler.outputFileSystem = fs;

  compiler.run(function(err, stats) {
    var output = compiler.options.output;
    var outputPath = path.join(output.path, output.filename);

    if (stats.toJson().errors.length > 0) {
      hexo.log.log(stats.toString());
      return callback(stats.toJson().errors, 'Webpack Error.');
    }

    contents = fs.readFileSync(outputPath).toString();
    return callback(null, contents);
  });

};

hexo.extend.renderer.register('js', 'js', renderer);
