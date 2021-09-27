/*
 * File: /webpack.config.ts
 * Project: cm-ecommerce/cm-ecommerce-client
 * Created Date: Monday September 27th 2021
 * Author: Myles Berueda
 * -----
 * Last Modified: Monday September 27th 2021 11:11:01 am
 * -----
 * Copyright (c) 2021 MylesWritesCode
 * -----
 * HISTORY
 */
import { Configuration } from "webpack";
import path from "path";
import { TsconfigPathsPlugin } from "tsconfig-paths-webpack-plugin";

const config: Configuration = {
  entry: "./src/pages/_app.tsx",
  module: {
    rules: [
      {
        test: /\.(ts|js)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-typescript"],
          },
        },
      },
    ],
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: [".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js",
  },
  devServer: {
    static: path.join(__dirname, "build"),
    compress: true,
    port: 4000,
  },
};

export default config;
