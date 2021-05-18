const path = require('path');

module.exports = {
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: [
        'style-loader',
        'css-loader',
        'sass-loader',
      ],
      include: path.resolve(__dirname, '../'),
    });

    const fileLoaderRule = config.module.rules.find(rule => rule.test && rule.test.test('.svg'));
    fileLoaderRule.exclude = /\.svg$/;

    config.module.rules.push({
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      issuer: {
        test: /\.scss$/
      },
      loader: 'url-loader'
    });

    config.module.rules.push({
      test: /\.svg$/,
      enforce: 'pre',
      issuer: {
        test: /\.tsx?$/
      },
      loader: require.resolve('@svgr/webpack'),
      options: {
        svgoConfig: {
          plugins: [
            {
              prefixIds: {
                prefixClassNames: false,
              },
              removeDimensions: false,
              removeViewBox: false,
            },
          ],
        },
      }
    });

    return config;
  },
  stories: ['../stories/**/*.stories.@(ts|tsx|js|jsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
  ],
  // https://storybook.js.org/docs/react/configure/typescript#mainjs-configuration
  typescript: {
    check: true, // type-check stories during Storybook build
  }
};
