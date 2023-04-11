const webpack = require("webpack");

module.exports = {
  // ...
  plugins: [
    new webpack.ProvidePlugin({
      util: "util",
    }),
  ],
  resolve: {
    fallback: {
      crypto: require.resolve("crypto-browserify"),
      stream: require.resolve("stream-browserify"),
      util: require.resolve("util/"),
      os: require.resolve("os-browserify/browser"),
    },
  },
};
