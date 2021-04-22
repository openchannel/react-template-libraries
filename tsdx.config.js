const styles = require('rollup-plugin-styles');
const rebasePlugin = require('rollup-plugin-rebase')
const svgr = require('@svgr/rollup').default

module.exports = {
	rollup(config, options) {
		config.plugins.push(
			svgr(),
			styles(),
			rebasePlugin(),
		);
		return config;
	},
};
