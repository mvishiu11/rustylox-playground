const path = require('path');
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');

module.exports = function override(config, env) {
  config.resolve.extensions.push('.wasm');
  config.plugins.push(
    new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname, './src/rustylox-pkg'),
    })
  );
  return config;
};
