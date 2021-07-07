import * as React from 'react';
import { Dropdown } from 'react-bootstrap';
import { shallow, ShallowWrapper } from 'enzyme';

import { OcSelect, OcSelectProps } from '../../../../src/react-common-components/ui/common';


const setUp = (props: OcSelectProps) => shallow(<OcSelect {...props} />);

describe('OcSelect', () => {
	let component: ShallowWrapper;

	const onSelectionChangeMock = jest.fn();

	beforeEach(() => {
		component = setUp({
			selectValArr: [ 'value_1' ],
			onSelectionChange: onSelectionChangeMock,
			value: '',
		});
	});

	it('should create', () => {
		expect(component).toBeTruthy();
		expect(component.find(Dropdown.Toggle)).toBeTruthy();
		expect(component.find(Dropdown.Menu)).toBeTruthy();
	});

	it('should have selected value', () => {
		component.setProps({ value: 'value_1' });

		const toggle = component.find(Dropdown.Toggle);

		expect(toggle.text()).toContain('value_1');
	});

	it('should be disabled', () => {
		component.setProps({ disabled: true });

		const toggle = component.find(Dropdown.Toggle);

		expect(toggle.prop('disabled')).toBe(true);
	});

	it('should render without value', () => {
		component.setProps({ value: undefined });

		const toggle = component.find(Dropdown.Toggle);

		expect(toggle.text()).toContain('');
	});

	it('should render placeholder', () => {
		component.setProps({ placeholder: 'Select something' });

		const toggle = component.find(Dropdown.Toggle);

		expect(toggle.text()).toContain('Select something');
	});

	it('should render toggle with selected value from passed value as object', () => {
		component.setProps({
			selectValArr: [ { key: 'selected value' } ],
			labelField: 'key',
			value: { key: 'selected value' },
		});

		const toggle = component.find(Dropdown.Toggle);

		expect(toggle.text()).toContain('selected value');
	});

	it('should click on second element with value and fire object', () => {
		const onSelectionChangeMock = jest.fn();

		const component = setUp({
			selectValArr: [{ key: 'value_1' }, { key: 'value_2' }],
			labelField: 'key',
			value: 'value_1',
			onSelectionChange: onSelectionChangeMock,
		});

		const toggle = component.find(Dropdown.Toggle);
		expect(toggle.text()).toContain('value_1');

		const listItem = component.find(Dropdown.Item).at(1);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const mockedEvent: any = {};
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		listItem.prop('onSelect')('value_2', mockedEvent);

		expect(onSelectionChangeMock).toHaveBeenCalledWith({ 'key': 'value_2' }, mockedEvent);
	});

	it('should click on second element and fire string', () => {
		const onSelectionChangeMock = jest.fn();

		const component = setUp({
			selectValArr: [ 'option_1', 'option_2' ],
			value: '',
			onSelectionChange: onSelectionChangeMock,
		});

		const listItem = component.find(Dropdown.Item).at(1);

		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const mockedEvent: any = {};
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		listItem.prop('onSelect')('option_2', mockedEvent);

		expect(onSelectionChangeMock).toHaveBeenCalledWith('option_2', mockedEvent);
	});
});
