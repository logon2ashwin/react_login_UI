const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const settings = {
  distPath: path.join(__dirname, "dist"),
  srcPath: path.join(__dirname, "src"),
};

function srcPathExtend(subpath) {
  return path.join(settings.srcPath, subpath);
}

module.exports = (env, options) => {
  const isDevMode = options.mode === "development";

  return {
    entry: "./app.js",
    output: {
      filename: "app.js",
      path: path.resolve(__dirname, "dist"),
      libraryTarget: "umd",
    },
    devtool: isDevMode ? "source-map" : false,
    resolve: {
      extensions: [".jsx", ".js"],
      alias : {
        store: path.resolve(__dirname, 'store/')
      }
    },
    module: {
      rules: [
        {
          test: /\.js$|jsx/,
          exclude: /(node_modules)/,
          loader: "babel-loader",
        },
        {
          test: /\.scss$/,
          use: [
            "style-loader",
            {
              loader: "css-loader",
              options: {
                sourceMap: isDevMode,
              },
            },
            {
              loader: "sass-loader",
              options: {
                sourceMap: isDevMode,
              },
            },
          ],
        },
        {
          test: /\.(ttf|eot|woff|woff2)$/,
          use: {
            loader: "file-loader",
            options: {
              name: "fonts/[name].[ext]",
            },
          },
        }
      ],
    },
    optimization: {
      usedExports: true,
      sideEffects: false,
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 1100,
      open: true,
      historyApiFallback: true
    },
    plugins: [
      new CleanWebpackPlugin({
        cleanOnceBeforeBuildPatterns: [settings.distPath],
        verbose: true,
      }),
      new HtmlWebpackPlugin({
        template: "./index.html",
      }),
    ],
  };
};
