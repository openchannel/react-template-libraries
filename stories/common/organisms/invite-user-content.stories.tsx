import * as React from 'react';
import { Story, Meta } from '@storybook/react';

import {
	InviteUserContent,
	InviteContentProps,
} from '../../../src/ui/common/organisms/oc-invite-modal/content';

export default {
	title: 'Invite user modal content [BEM]',
	component: InviteUserContent,
} as Meta;

const Component: Story<InviteContentProps> = (args) => {
	return (
		<div className="invite-modal">
			<InviteUserContent {...args} />
		</div>
	);
};

export const ConfirmationContent = Component.bind({});
ConfirmationContent.args = {
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	onClose: () => {},
};
ConfirmationContent.storyName = 'Modal';
