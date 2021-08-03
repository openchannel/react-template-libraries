import * as React from 'react';
import { mount } from 'enzyme';

import OcProfileNavbar from '../../../../src/ui/common/molecules/oc-profile-navbar';

describe('Profile Navbar (common)', () => {
	const options = [
		{ label: 'one', value: 'one' },
		{ label: 'two', value: 'two' },
	];

	const component = mount(
		<OcProfileNavbar
			initials="TU"
			username="Test Username"
			role="admin"
			options={options}
			onSelect={() => {}}
		/>,
	);
	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have options, username, role & initials', () => {
		expect(component.prop('initials')).toEqual('TU');
		expect(component.prop('username')).toEqual('Test Username');
		expect(component.prop('role')).toEqual('admin');
		expect(component.prop('options')).toEqual(options);
	});
});
