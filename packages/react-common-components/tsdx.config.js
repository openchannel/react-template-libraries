const styles = require('rollup-plugin-styles');
const svgr = require('@svgr/rollup').default

module.exports = {
	rollup(config, options) {
		options.format = 'esm';
		config.output.esModule = true;
		config.plugins.push(
			svgr(),
			styles(),
		);
		return config;
	},
};
