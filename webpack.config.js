const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin.js');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'development',

	devtool: 'eval',

	resolve: {
		modules: ['node_modules'],
		extensions: ['.js', '.vue', '.css'],
		alias: {
			'@': path.resolve(__dirname, 'src/'),
		},
	},

	entry: {
		bundle: path.join(__dirname, './src/main.js'),
	},

	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
			},
			{
				test: /\.css$/,
				loader: ['vue-style-loader', 'css-loader'],
			},
			{
				test: /\.(png|jpg)$/,
				loader: ['file-loader'],
			},
			{
				test: /\.s(c|a)ss$/,
				use: [
					'vue-style-loader',
					'css-loader',
					{
						loader: 'sass-loader',
						options: {
							implementation: require('sass'),
						},
					},
				],
			},
			{
				test: /\.m?js$/,
				include: [path.resolve(__dirname, 'src/js')],
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: ['@babel/plugin-proposal-class-properties'],
					},
				},
			},
		],
	},

	plugins: [
		new VueLoaderPlugin(),
		new Dotenv(),
		new HtmlWebpackPlugin({
			template: './index.html',
		}),
	],

	output: {
		filename: '[name].js',
		path: path.join(__dirname, 'dist'),
		publicPath: '/dist',
	},

	devServer: {
		contentBase: './',
		port: 8080,
		historyApiFallback: true,
		inline: true,
	},
};
