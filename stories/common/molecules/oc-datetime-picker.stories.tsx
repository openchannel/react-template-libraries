import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import { OcDatetimePicker, DatepickerProps } from '../../../src/ui/common';
import moment, { Moment } from 'moment';

export default {
  title: 'Date component [BEM]',
  component: OcDatetimePicker,
  disabled: false,
} as Meta;

const DateComponent: Story<DatepickerProps> = (args) => {
  const [date, setDate] = React.useState<string | Moment>(moment());

  return <OcDatetimePicker {...args} value={date} onChange={setDate} />;
};

export const DisabledDate = DateComponent.bind({});
DisabledDate.args = {
  disabled: true,
};
export const DefaultDate = DateComponent.bind({});
DefaultDate.args = {
  type: 'date',
  disabled: false,
};
export const DefaultDateTime = DateComponent.bind({});
DefaultDateTime.args = {
  type: 'datetime',
  disabled: false,
};
