import * as React from 'react';
import { mount } from 'enzyme';

import { OcTextSearchComponent } from '../../../src/ui/common';

describe('Default text input', () => {
	let component = mount(
		<OcTextSearchComponent
			required={false}
			disabled={false}
			placeholder="Search"
			onChange={() => {}}
			searchButtonText="Search"
			clearButtonText="Cancel"
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
