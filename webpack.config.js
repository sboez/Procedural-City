const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/scripts/main.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'dist/main.js',
	},
	performance: {
		hints: false
	},
	plugins: [
		new CopyWebpackPlugin([{ from: '**/*', to: '' }], {
			context: 'src',
			writeToDisk: true,
		}),
	],
	devServer: {
		contentBase: path.resolve(__dirname, 'dist'),
		port: 9000, 
		historyApiFallback: true
	},
};
