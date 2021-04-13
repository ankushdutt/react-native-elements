const path = require('path');
const webpack = require('webpack');
module.exports = function () {
  return {
    name: 'custom-docusaurus-plugin',
    configureWebpack(_config, isServer, utils) {
      const { getBabelLoader } = utils;
      const babelOptions = {
        cacheDirectory: true,
        presets: ['module:metro-react-native-babel-preset'],
      };

      return {
        module: {
          rules: [
            {
              test: /\.(js|jsx)$/i,
              include: [
                path.resolve(
                  __dirname,
                  'node_modules/react-native-vector-icons'
                ),
                path.resolve(__dirname, 'node_modules/react-native-elements'),
                path.resolve(__dirname, 'node_modules/react-native-ratings'),
              ],
              use: getBabelLoader(isServer, babelOptions),
            },
          ],
        },
        resolve: {
          alias: {
            'react-native$': 'react-native-web',
          },
        },

        // fs resolve
        node: {
          fs: 'empty',
        },

        // fixes server build problem with react-view
        plugins: [
          new webpack.ProvidePlugin({
            Buffer: ['buffer', 'Buffer'],
          }),
        ],
      };
    },
  };
};
