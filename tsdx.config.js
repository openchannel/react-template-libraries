const styles = require('rollup-plugin-styles');
const rebasePlugin = require('rollup-plugin-rebase')
const inlineSvg = require('rollup-plugin-inline-svg');

module.exports = {
	rollup(config, options) {
		config.plugins.push(
			inlineSvg(),
			styles(),
			rebasePlugin(),
		);
		return config;
	},
};
