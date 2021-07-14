import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { useModalState } from '../../../packages/react-common-components/src/lib/hooks';

import {
  OcButtonComponent,
  OcConfirmationModalComponent,
  ConfirmationModalProps,
} from '../../../packages/react-common-components/src/ui/common';

export default {
  title: 'Confirmation modal',
  component: OcConfirmationModalComponent,
} as Meta;

const ModalComponent: Story<ConfirmationModalProps> = (args, { name }) => {
  const { isOpened, closeModal, openModal } = useModalState();

  return (
    <div>
      <OcButtonComponent style={{ width: 300 }} onClick={openModal}>
        Open {name} modal
      </OcButtonComponent>
      <OcConfirmationModalComponent
        {...args}
        isOpened={isOpened}
        onClose={closeModal}
        onCancel={closeModal}
        onSubmit={closeModal}
      />
    </div>
  );
};

export const DefaultConfirmation = ModalComponent.bind({});
DefaultConfirmation.args = {
  modalTitle: 'Submit app',
  modalText: 'Submit this app to the marketplace now?',
  confirmButtonText: 'Yes, submit it',
};
DefaultConfirmation.storyName = 'Default confirmation';

export const WarningConfirmation = ModalComponent.bind({});
WarningConfirmation.args = {
  modalTitle: 'Delete app',
  modalText: 'Delete this app from the marketplace now?',
  confirmButtonText: 'Yes, delete it',
  confirmButtonType: 'danger',
};
WarningConfirmation.storyName = 'Warning confirmation';
