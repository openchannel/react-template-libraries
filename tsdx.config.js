const styles = require('rollup-plugin-styles');
const svgr = require('@svgr/rollup').default

module.exports = {
	rollup(config, options) {
		config.plugins.push(
			svgr(),
			styles(),
		);
		return config;
	},
};
