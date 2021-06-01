import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import {
  Content,
  ContentProps,
} from '../../../src/ui/common/organisms/oc-confirmation-modal/content';

export default {
  title: 'Confirmation modal content',
  component: Content,
} as Meta;

const Component: Story<ContentProps> = (args) => {
  return (
    <div className="confirmation-modal">
      <Content {...args} />
    </div>
  );
};

export const ConfirmationContent = Component.bind({});
ConfirmationContent.args = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClose: () => {},
  modalTitle: 'Submit app',
  modalText: 'Submit this app to the marketplace now?',
  confirmButtonText: 'Yes, submit it',
};
ConfirmationContent.storyName = 'Confirmation content';

export const WarningContent = Component.bind({});
WarningContent.args = {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onClose: () => {},
  modalTitle: 'Delete app',
  modalText: 'Delete this app from the marketplace now?',
  confirmButtonText: 'Yes, delete it',
  confirmButtonType: 'danger',
};
WarningContent.storyName = 'Warning content';
