const path = require('path');

module.exports = {
	// Fichier d'entrée
	entry: './js/main.js',
	// Fichier de sortie
	output: {
		path: path.resolve(__dirname, './build'),
		filename: 'main.bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/, // tous les fichiers .js
				exclude: /node_modules/, // sauf le dossier node_modules
				use: {
					// seront transpilés par babel
					loader: 'babel-loader',
					options: {
						presets: [
						  '@babel/preset-env',
						  {
							plugins: [
							  '@babel/plugin-proposal-class-properties'
							]
						  }
						]
					  }
				},
				
			}
		]
	},
	devtool: 'source-map',
	node: {
		fs: 'empty'
	}
};
