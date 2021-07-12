import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import DownArrow from '../../../src/assets/img/select-down.svg';
import UpArrow from '../../../src/assets/img/select-up.svg';
import { OcProfileNavbar, ProfileNavbarProps } from '../../../src/ui/common';

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
	defaultPlaceholderIcon: <DownArrow />,
	activePlaceholderIcon: <UpArrow />,
	variant: 'block',
};

export const ProfileWithTextOnly = ProfileNavbarComponent.bind({});
ProfileWithTextOnly.args = {
	initials: '',
	username: 'Custom Text',
	role: '',
	defaultPlaceholderIcon: <DownArrow />,
	activePlaceholderIcon: <UpArrow />,
	variant: 'block',
};
