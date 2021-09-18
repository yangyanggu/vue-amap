// https://github.com/shelljs/shelljs
require('./check-versions')();
require('shelljs/global');
process.env.NODE_ENV = 'production'
const path = require('path');
let config = require('../config');
const ora = require('ora');
const webpack = require('webpack');
let webpackConfig = require('./webpack.lib.conf');

const spinner = ora('building for lib release ...\r\n');
spinner.start();


webpack(webpackConfig, function(err, stats) {
  spinner.stop();
  if (err) throw err;
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n');
});
