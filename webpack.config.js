// Generated using webpack-cli https://github.com/webpack/webpack-cli

const fs = require('fs');
const path = require('path');
const px2rem = require('postcss-plugin-px2rem');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent');

const isProduction = process.env.NODE_ENV == 'production';
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

process.env.BABEL_ENV = 'development';

const config = {
    entry: './src/index',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'static/js/[name].[contenthash:8].js',
        chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'index.html',
        }),
        new MiniCssExtractPlugin({
          filename: 'static/css/[name].[contenthash:8].css',
          chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
        }),
    ],
    module: {
        rules: [
            {
              test: /\.(js|mjs|jsx|ts|tsx)$/,
              include: resolveApp('src'),
              loader: require.resolve('babel-loader'),
              options: {
                customize: require.resolve(
                  'babel-preset-react-app/webpack-overrides'
                ),
                presets: [
                  [
                    require.resolve('babel-preset-react-app'),
                    {
                      runtime: 'classic',
                    },
                  ],
                ],
                cacheDirectory: true,
                cacheCompression: false,
                compact: true,
                plugins: [
                  [
                    "import", 
                    {
                      libraryName: "antd", // 对哪个模块进行按需加载
                      libraryDirectory: "es", // 按需加载的模块 如果实现按需加载 必须是es module
                      style: "less",
                    }
                  ]
                ]
              }
            },
            {
              test: /\.(js|mjs)$/,
              exclude: /@babel(?:\/|\\{1,2})runtime/,
              loader: require.resolve('babel-loader'),
              options: {
                babelrc: false,
                configFile: false,
                compact: false,
                presets: [
                  [
                    require.resolve('babel-preset-react-app/dependencies'),
                    { helpers: true },
                  ],
                ],
                cacheDirectory: true,
                cacheCompression: false,
                sourceMaps: true,
                inputSourceMap: true,
                plugins: [
                  [
                    "import", 
                    {
                      libraryName: "antd", // 对哪个模块进行按需加载
                      libraryDirectory: "es", // 按需加载的模块 如果实现按需加载 必须是es module
                      style: "less",
                    }
                  ]
                ]
              },
            },
            {
              test: /\.css$/i,
              use: [  
                MiniCssExtractPlugin.loader, 
                'css-loader', 
                {
                  loader: 'postcss-loader',
                  options: {
                    postcssOptions: {
                      plugins: [
                        'autoprefixer',
                        px2rem({
                          rootValue: 100, // 1rem 是 100px
                          unitPrecision: 5, // 保留五位小数
                          exclude: /node_modules/,
                          propList: ['*'],
                        })
                      ]
                    }
                  }
                }
              ],
            },
            {
                test: /\.less$/i,
                exclude: /\.module\.less/i,
                use: [ 
                  MiniCssExtractPlugin.loader, 
                  'css-loader', 
                  {
                    loader: 'postcss-loader',
                    options: {
                      postcssOptions: {
                        plugins: [
                          'autoprefixer',
                          px2rem({
                            rootValue: 100, // 1rem 是 100px
                            unitPrecision: 5, // 保留五位小数
                            exclude: /node_modules/,
                            propList: ['*'],
                          })
                        ]
                      }
                    }
                  },
                  'less-loader'
                ],
            },
            {
              test: /\.module\.less/i,
              use: [ 
                MiniCssExtractPlugin.loader, 
                {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 2,
                    sourceMap: true,
                    esModule: false,
                    modules: {
                      mode: 'local',
                      getLocalIdent: getCSSModuleLocalIdent,
                    }
                  }
                }, 
                {
                  loader: 'postcss-loader',
                  options: {
                    postcssOptions: {
                      ident: 'postcss',
                      config: false,
                      plugins: [
                        'autoprefixer',
                        px2rem({
                          rootValue: 100, // 1rem 是 100px
                          unitPrecision: 5, // 保留五位小数
                          exclude: /node_modules/,
                          propList: ['*'],
                        })
                      ]
                    },
                  }
                }, 
                'less-loader'
              ],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '...'],
        alias: {
          '@': path.resolve(__dirname, './src'),
        }
    },
};

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        
    } else {
        config.mode = 'development';
    }
    return config;
};
