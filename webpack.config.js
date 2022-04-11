const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	mode: 'none',
	entry: {
		app: path.join(__dirname, 'src', 'index.tsx'),
	},
	target: 'web',
	resolve: {
		extensions: ['.tsx', '.ts', '.js'],
		alias: {
			Helpers: path.resolve(__dirname, 'src/@helpers/'),
			Templates: path.resolve(__dirname, 'src/@templates/'),
		},
	},
	module: {
		rules: [
			{
				test: /\.(ts|js)x?$/,
				use: [{ loader: 'babel-loader' }],
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
		filename: '[name].js',
		path: path.resolve(__dirname, '.', 'dist'),
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: path.join(__dirname, 'public', 'index.html'),
		}),
	],
};
