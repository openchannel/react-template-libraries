import * as React from 'react';
import { Story, Meta } from '@storybook/react';
// import { DatepickerProps } from '../../../packages/react-common-components/src/ui/common';
import OcDatetimePicker from '../../../packages/react-common-components/src/ui/common/molecules/oc-datetime-picker';

export default {
	title: 'Date component [BEM]',
	component: OcDatetimePicker,
	disabled: false,
} as Meta;

const DateComponent: Story<any> = (args) => {
	const [date, setDate] = React.useState<string | Date>(new Date());

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
	settings: '',
};
export const DefaultDateTime = DateComponent.bind({});
DefaultDateTime.args = {
	type: 'datetime',
	disabled: false,
	settings: '',
};
