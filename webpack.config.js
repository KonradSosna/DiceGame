const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = {
	mode: 'none',
	entry: './src/index.tsx',
	target: 'web',
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		alias: {
			helpers: path.resolve(__dirname, 'src/helpers/'),
			img: path.resolve(__dirname, 'src/img/'),
		},
	},
	devServer: {
		hot: true,
		port: 3000,
		historyApiFallback: true,
	},
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				use: ['babel-loader'],
				exclude: '/node_modules/',
			},
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
			},
			{
				test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
				type: 'asset/resource',
			},
		],
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, '.', 'dist'),
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './src/index.html',
		}),
		new ReactRefreshWebpackPlugin(),
	],
};
