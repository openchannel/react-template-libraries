import * as React from 'react';
import { mount } from 'enzyme';
import OcTextSearchComponent from '../../../src/ui/common/atoms/oc-text-search/oc-text-search';

describe('Default text input', () => {
	let component = mount(
		<OcTextSearchComponent
			required={false}
			disabled={false}
			placeholder="Search"
			searchButtonText="Search"
			clearButtonText="Cancel"
			onChange={() => {}}
		/>,
	);

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should contain text value', () => {
		expect(component.prop('placeholder')).toEqual('Search');
	});

	it('should contain required prop and be true', async () => {
		component.setProps({ required: true });

		expect(component.prop('required')).toBeTruthy();
	});

	it('button should be disabled', async () => {
		component.setProps({ disabled: true });

		expect(component.prop('disabled')).toBeTruthy();
	});
});
