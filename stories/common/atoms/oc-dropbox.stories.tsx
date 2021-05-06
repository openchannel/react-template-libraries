import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import { OcDropboxComponent, DropboxProps } from '../../../src/ui/common';

export default {
  title: 'Dropbox search [BEM]',
  component: OcDropboxComponent,
} as Meta;

const DropboxComponent: Story<DropboxProps> = (args) => <OcDropboxComponent {...args} />;

export const DefaultDropbox = DropboxComponent.bind({});
DefaultDropbox.args = {
  placeholder: 'Default placeholder',
  items: [
    {
      label: 'first',
      value: 'first',
    },
    {
      label: 'second',
      value: 'second',
    },
    {
      label: 'third',
      value: 'third',
    },
  ],
};
export const ScrollDropbox = DropboxComponent.bind({});
ScrollDropbox.args = {
  placeholder: 'Default placeholder',
  items: [
    {
      label: '1',
      value: '1',
    },
    {
      label: '2',
      value: '2',
    },
    {
      label: '3',
      value: '3',
    },
    {
      label: '4',
      value: '4',
    },
    {
      label: '5',
      value: '5',
    },
    {
      label: '6',
      value: '6',
    },
    {
      label: '7',
      value: '7',
    },
    {
      label: '8',
      value: '8',
    },
    {
      label: '9',
      value: '9',
    },
    {
      label: '10',
      value: '10',
    },
    {
      label: '11',
      value: '11',
    },
    {
      label: '12',
      value: '12',
    },
    {
      label: '13',
      value: '13',
    },
    {
      label: '14',
      value: '14',
    },
    {
      label: '15',
      value: '15',
    },
  ],
};
export const EmptyDropbox = DropboxComponent.bind({});
EmptyDropbox.args = {
  placeholder: '',
  items: [],
};
