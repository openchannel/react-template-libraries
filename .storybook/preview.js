import { MINIMAL_VIEWPORTS } from '@storybook/addon-viewport';

import '../packages/react-common-components/src/ui/styles/styles.scss';

export const parameters = {
  actions: { argTypesRegex: '^on.*' },
  viewport: {
    viewports: MINIMAL_VIEWPORTS,
  },
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}
