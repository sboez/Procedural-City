const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/scripts/main.js',
	output: {
		path: path.resolve(__dirname, 'build'),
		filename: 'main.js',
		publicPath: '/'
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
		historyApiFallback: true,
		port: 9000
	}
};
