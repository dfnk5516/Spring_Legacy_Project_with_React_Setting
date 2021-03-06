const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const RemovePlugin = require('remove-files-webpack-plugin');


module.exports = {
  entry: path.resolve(__dirname, '../src/front/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../src/main/webapp/'),
  },
  devServer : {
	contentBase : path.resolve(__dirname, '../src/main/webapp/'),
	index : 'main.html',
	port : 9001
  },
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: "/node_modules",
        use: ["babel-loader"]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader', // html파일을 읽을때 html-loader 실행하여 웹팩이 이해할 수 있도록 함
            options: { minimize: true }, // minimize : 코드 최적화 옵션
          },
        ],
      },
      {
		  test : /\.css$/,
		  use : [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
    	  test : /\.scss$/,
		  use : [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
    	  test : /\.(svg|png|jpg)$/,
    	  use : {
			  loader : 'file-loader',
			  options: {
				  //publicPath: '../src/main/webapp/',
				  name: '[name].[ext]?[hash]'
			  }
		  }
      }
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: path.resolve(__dirname, '../public/index.html'), // public/index.html 파일을 읽는다.
      filename: path.resolve(__dirname, '../src/main/webapp/main.html') // output 으로 출력할 파일은 main.html 이다.
    }),
    new MiniCssExtractPlugin({
    	filename : 'style-test.css'
    }),
    //new CleanWebpackPlugin([ 'src' ],{ exclude: ['resources', 'WEB-INF'] })
    new RemovePlugin({
        before: {
          test: [
            {
              folder: path.resolve(__dirname, '../src/main/webapp/'),
              method: () => true
            }
          ],
          exclude: [
        	  path.resolve(__dirname, '../src/main/webapp/resources'),
        	  path.resolve(__dirname, '../src/main/webapp/WEB-INF')
          ]
        }
    })
  ],
};
