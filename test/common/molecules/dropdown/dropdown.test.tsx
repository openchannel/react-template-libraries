import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import BootstrapDropdown from 'react-bootstrap/Dropdown';

import { Dropdown, DropdownProps } from '../../../../src/ui/common';


const setUp = (props: DropdownProps) => shallow(<Dropdown {...props} />);

describe('Dropdown (common)', () => {
	let component: ShallowWrapper;

	const option_1 = { label: 'option_1', value: 'option_1' };

	const onSelectMock = jest.fn();

	beforeEach(() => {
		component = setUp({
			variant: 'inline',
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

		expect(toggle.text()).toContain('option_1');
	});

	it('should render with "button" styles', () => {
		component.setProps({
			variant: 'block',
		});

		const toggle = component.find(BootstrapDropdown);

		expect(toggle.hasClass('dropdown-button')).toBeTruthy();
	});

	it('should click on first element in list and callback selected value as object', () => {
		const listItem = component.find(BootstrapDropdown.Item).at(0);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const mockedEvent: any = {};
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		listItem.prop('onSelect')('option_1', mockedEvent);

		expect(onSelectMock).toHaveBeenCalledWith(option_1, mockedEvent);
	});
});
