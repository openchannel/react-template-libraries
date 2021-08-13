import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import styles from 'rollup-plugin-styles';
import resolve from '@rollup/plugin-node-resolve';
import svgr from '@svgr/rollup';
import del from 'rollup-plugin-delete';

import pkg from './package.json';

const INPUT_FILES = {
	'index': 'src/ui/styles/styles.scss',
	//auth
	'auth/organisms': 'src/ui/auth/organisms/index.ts',
	//common
	'common/atoms': 'src/ui/common/atoms/index.ts',
	'common/molecules': 'src/ui/common/molecules/index.ts',
	'common/organisms': 'src/ui/common/organisms/index.ts',
	//form
	'form/atoms': 'src/ui/form/atoms/index.ts',
	'form/molecules': 'src/ui/form/molecules/index.ts',
	'form/organisms': 'src/ui/form/organisms/index.ts',
	//management
	'management/organisms': 'src/ui/management/organisms/index.ts',
	//market
	'market/atoms': 'src/ui/market/atoms/index.ts',
	'market/molecules': 'src/ui/market/molecules/index.ts',
	'market/organisms': 'src/ui/market/organisms/index.ts',
	//portal
	'portal/organisms': 'src/ui/portal/organisms/index.ts',
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
			svgr(),
			styles(),
			resolve(),
			typescript({
				tsconfig: 'tsconfig.build.json',
			}),
			commonjs(),
			del({ targets: 'dest/*' }),
		],
		external: Object.keys(pkg.peerDependencies || {}),
	},
];
