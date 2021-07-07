import * as React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import BootstrapDropdown from 'react-bootstrap/Dropdown';

import { OcDropdown, OcDropdownProps } from '../../../../src/react-common-components/ui/common';


const setUp = (props: OcDropdownProps) => mount(<OcDropdown {...props} />);

describe('OcDropdown (common)', () => {
	let component: ReactWrapper;

	const option_1 = { label: 'option_1', value: 'option_1' };

	const onSelectMock = jest.fn();

	beforeEach(() => {
		component = setUp({
			title: 'selected -',
			options: [ option_1 ],
			onSelect: onSelectMock,
		});

		jest.clearAllMocks();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
		expect(component.find(BootstrapDropdown.Toggle)).toBeTruthy();
		expect(component.find(BootstrapDropdown.Menu)).toBeTruthy();
	});

	it('should have selected value', () => {
		component.setProps({ selected: option_1 });

		const toggle = component.find(BootstrapDropdown.Toggle);

		expect(toggle.text()).toContain('selected - option_1');
	});
});
