import * as React from 'react';
import { Meta, Story } from '@storybook/react';
import { BillingForm } from '@openchannel/react-common-components/src/ui/auth/organisms/oc-billing-form';

export default {
	title: 'Billing Form component',
	component: BillingForm,
} as Meta;

const Component: Story<any> = (args) => {
	return (
		<div className="col-md-12 col-lg-5 col-xxl-6 mt-3 mt-lg-1">
			<BillingForm {...args} onSubmit={(e) => console.log(e)} />
		</div>
	);
};

export const MarketBillingForm = Component.bind({});
MarketBillingForm.args = {
	hideCardFormElements: false,
};
