import * as React from 'react';
import { mount } from 'enzyme';

import { OcExpandableSelect } from '../../../../src/ui/common';
// import { ExpandableListItem } from '../../../../src/ui/common/molecules/oc-select-expandable/expandable-select-item';

describe('OcSelect', () => {
	const selectModels = [
		{
			label: 'Category 1',
			checked: false,
		},
	];

	it('should create', () => {
		const component = mount(
			<OcExpandableSelect
				title="App Category"
				toggle={() => {}}
				isCollapsed
				onChange={() => {}}
				selectModels={selectModels}
			/>,
		);
		expect(component).toBeTruthy();
	});

	it('should have title', () => {
		const component = mount(
			<OcExpandableSelect
				title="App Category"
				toggle={() => {}}
				isCollapsed
				onChange={() => {}}
				selectModels={selectModels}
			/>,
		);
		component.setProps({ title: 'value_1' });
		expect(component.prop('title')).toEqual('value_1');
	});

	it('should be collapsed', () => {
		const component = mount(
			<OcExpandableSelect
				title="App Category"
				toggle={() => {}}
				isCollapsed
				onChange={() => {}}
				selectModels={selectModels}
			/>,
		);
		component.setProps({ isCollapsed: false });

		expect(component.prop('isCollapsed')).toBe(false);
	});
});
