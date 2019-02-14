const withSass = require("@zeit/next-sass");
const withCss = require("@zeit/next-css");
const withImages = require("next-images");
const { parsed: localEnv } = require("dotenv").config();
const webpack = require("webpack");

module.exports = withImages(
  withCss(
    withSass({
      webpack(config) {
        config.module.rules.push({
          test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
          use: {
            loader: "url-loader",
            options: {
              limit: 100000,
              publicPath: "./",
              outputPath: "static/",
              name: "[name].[ext]"
            }
          }
        });
        config.plugins.push(new webpack.EnvironmentPlugin(localEnv));

        return config;
      }
    })
  )
);
