const styles = require('rollup-plugin-styles');
const rebasePlugin = require('rollup-plugin-rebase');

module.exports = {
	rollup(config, options) {
		config.plugins.push(
			styles(),
			rebasePlugin()
		);
		return config;
	},
};
