let path = require("path");
let MiniCssExtractPlugin = require("mini-css-extract-plugin");

let conf = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "./dist/"),
    filename: "[name].js",
    publicPath: "dist/"
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [
              "@babel/plugin-transform-react-jsx",
              ["@babel/plugin-proposal-decorators", { legacy: true }],
              ["@babel/plugin-proposal-class-properties", { loose: true }]
            ]
          }
        }
      },
      {
        test: /\.module\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "./dist/",
              hmr: process.env.NODE_ENV === "development",
              reloadAll: true
            }
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: "[local]__[sha1:hash:hex:7]"
              }
            }
          }
        ]
      },
      {
        test: /^((?!\.module).)*css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "./dist/",
              hmr: process.env.NODE_ENV === "development",
              reloadAll: true
            }
          },
          "css-loader"
        ]
      },
      {
        test: /^((?!\.module).)*less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "./dist/",
              hmr: process.env.NODE_ENV === "development",
              reloadAll: true
            }
          },
          "css-loader",
          "less-loader"
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]"
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
      "~com": path.resolve(__dirname, "src/components"),
      "~con": path.resolve(__dirname, "src/containers"),
      "~s": path.resolve(__dirname, "src/store"),
      "~r": path.resolve(__dirname, "src/router"),
      "~img": path.resolve(__dirname, "images"),
      "~api": path.resolve(__dirname, "src/api"),
      "~hocs": path.resolve(__dirname, "src/hocs"),
      "~help": path.resolve(__dirname, "src/helpers")
    }
  },
  devServer: {
    historyApiFallback: true,
    contentBase: "./",
    // https: true,
    hot: true,
    // port: 8888,
    overlay: true,
    disableHostCheck: true,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers":
        "X-Requested-With, content-type, Authorization"
    },
    proxy: {
      "/photos/**": {
        target: "https://api.unsplash.com",
        secure: false,
        changeOrigin: true
      },
      "/authorize/**": {
        target: "https://unsplash.com/oauth",
        secure: false,
        changeOrigin: true
      }
    }
  }
};

module.exports = conf;
