import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import { OcProfileNavbar, ProfileNavbarProps } from '../../../packages/react-common-components/src/ui/common/molecules/oc-profile-navbar';

export default {
	title: 'Profile Navbar [BEM]',
	component: OcProfileNavbar,
} as Meta;

const ProfileNavbarComponent: Story<ProfileNavbarProps> = (args) => {
	const [selected, setSelected] = React.useState<any>({
		label: 'newest',
		value: 'string',
	});

	return <OcProfileNavbar {...args} onSelect={setSelected} selected={selected} />;
};

export const ProfileWithAllData = ProfileNavbarComponent.bind({});
ProfileWithAllData.args = {
	initials: 'TU',
	username: 'Test Username',
	role: 'admin',
};

export const ProfileWithTextOnly = ProfileNavbarComponent.bind({});
ProfileWithTextOnly.args = {
	initials: '',
	username: 'Custom Text',
	role: '',
};
