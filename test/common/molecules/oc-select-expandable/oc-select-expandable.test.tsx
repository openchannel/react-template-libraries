import * as React from 'react';
import { Dropdown } from 'react-bootstrap';
import { shallow, ShallowWrapper } from 'enzyme';

import { OcExpandableSelect, ExpandSelectProps } from '../../../../src/ui/common';

const setUp = (props: ExpandSelectProps) => shallow(<OcExpandableSelect {...props} />);

describe('OcSelect', () => {
	let component: ShallowWrapper;

	const onSelectionChangeMock = jest.fn();

	beforeEach(() => {
		component = setUp({
			title: 'Default',
			isCollapsed: false,
			selectModels: [
				{
					label: 'Category 1',
					checked: false,
					name: '0',
					onChange: () => {},
				},
				{
					label: 'Category 2',
					checked: false,
					name: '1',
					onChange: () => {},
				},
			],
			onChange: () => {},
			toggle: () => {},
		});
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have title', () => {
		component.setProps({ title: 'value_1' });
		expect(component).toContain('value_1');
	});

	it('should be collapsed', () => {
		component.setProps({ isCollapsed: true });

		expect(component.prop('isCollapsed')).toBe(true);
	});
});
