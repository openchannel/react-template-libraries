import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import { BillingForm } from '@openchannel/react-common-components/src/ui/auth/organisms/oc-billing-form';

export default {
	title: 'Billing Form component',
	component: BillingForm,
} as Meta;

const Component: Story<any> = (args) => {
	return <BillingForm {...args} onSubmit={(e) => console.log(e)} />;
};

export const MarketBillingForm = Component.bind({});
MarketBillingForm.args = {
	hideCardFormElements: false,
};
