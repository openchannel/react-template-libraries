import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import styles from 'rollup-plugin-styles';
import resolve from '@rollup/plugin-node-resolve';
import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup';
import del from 'rollup-plugin-delete';

import pkg from './package.json';

export default {
	input: ['src/index.ts'],
	// input: [
	// 	'src/ui/auth/index.ts',
	// 	'src/ui/common/index.ts',
	// 	'src/ui/form/index.ts',
	// 	'src/ui/management/index.ts',
	// 	'src/ui/market/index.ts',
	// 	'src/ui/portal/index.ts',
	// ],
	output: {
		dir: 'dist',
		format: 'esm',
		sourcemap: true,
		globals: {
			react: 'React',
			'react-dom': 'ReactDOM',
		},
		exports: 'named',
		// inlineDynamicImports: true,
	},
	// manualChunks: {
	// 	'vendor': [
	// 		'node_modules/chart.js',
	// 	],
	// },
	manualChunks: (moduleName) => {
		// Every module whose name includes `node_modules` should be in vendor:
		if (moduleName.includes('node_modules')) {
			return 'vendor'
		}
		// Every other module will be in the chunk based on its entry point!
	},
	plugins: [
		external(),
		// postcss({
		// 	modules: false,
		// 	extract: true,
		// 	minimize: true,
		// 	sourceMap: true
		// }),
		// url(),
		svgr(),
		styles(),
		resolve(),
		typescript({
			tsconfig: 'tsconfig.build.json',
			// rollupCommonJSResolveHack: true,
			// clean: true,
			// declaration: true,
			// declarationDir: 'dist',
		}),
		commonjs(),
		del({ targets: 'dist/*' }),
	],
	external: Object.keys(pkg.peerDependencies || {}),
};
