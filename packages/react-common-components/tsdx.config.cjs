import styles from 'rollup-plugin-styles';
import svgr from '@svgr/rollup';

export default function(config, options) {
	options.format = 'esm';
	config.output.esModule = true;
	config.plugins.push(
		svgr(),
		styles(),
	);
	return config;
}
