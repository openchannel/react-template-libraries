import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import styles from 'rollup-plugin-styles';
import resolve from '@rollup/plugin-node-resolve';
import svgr from '@svgr/rollup';
import url from '@rollup/plugin-url';

import pkg from './package.json';

const INPUT_FILES = {
	'index': 'src/ui/styles/styles.scss',
	//auth
	'ui/auth/organisms/index': 'src/ui/auth/organisms/index.ts',
	//common
	'ui/common/atoms/index': 'src/ui/common/atoms/index.ts',
	'ui/common/models/index': 'src/ui/common/models/index.ts',
	'ui/common/molecules/index': 'src/ui/common/molecules/index.ts',
	'ui/common/organisms/index': 'src/ui/common/organisms/index.ts',
	//form
	'ui/form/atoms/index': 'src/ui/form/atoms/index.ts',
	'ui/form/models/index': 'src/ui/form/models/index.ts',
	'ui/form/molecules/index': 'src/ui/form/molecules/index.ts',
	'ui/form/organisms/index': 'src/ui/form/organisms/index.ts',
	//management
	'ui/management/models/index': 'src/ui/management/models/index.ts',
	'ui/management/organisms/index': 'src/ui/management/organisms/index.ts',
	//market
	'ui/market/atoms/index': 'src/ui/market/atoms/index.ts',
	'ui/market/molecules/index': 'src/ui/market/molecules/index.ts',
	'ui/market/organisms/index': 'src/ui/market/organisms/index.ts',
	//portal
	'ui/portal/models/index': 'src/ui/portal/models/index.ts',
	'ui/portal/organisms/index': 'src/ui/portal/organisms/index.ts',
};

export default [
	{
		input: INPUT_FILES,
		output: {
			dir: 'dist',
			format: 'esm',
			sourcemap: true,
			globals: {
				react: 'React',
				'react-dom': 'ReactDOM',
			},
			exports: 'named',
		},
		plugins: [
			external(),

			// replace svg imports only for the components
			url({
				exclude: ['**/*.scss'],
			}),
			svgr(),
			styles(),
			resolve({
				browser: true,
				// Force resolving for these modules to root's node_modules that helps
				// to prevent bundling the same package multiple times if package is
				// imported from dependencies.
				dedupe: ['react', 'react-dom'],
			}),
			typescript({
				tsconfig: 'tsconfig.json',
			}),
			commonjs(),
		],
		external: Object.keys(pkg.peerDependencies || {}),
	},
];
