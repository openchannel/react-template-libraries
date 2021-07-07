import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { ListItem } from '../../../../src/react-common-components/ui/common/molecules/oc-dropdown/common/list-item';
import { ListWrapper } from '../../../../src/react-common-components/ui/common/molecules/oc-dropdown/common/list-wrapper';


describe('OcDropdown - list wrapper component (common dropdown)', () => {
	const component: ShallowWrapper = shallow(
		<ListWrapper
			variant="inline"
			style={{ position: 'absolute' }}
			className=""
		>
			<ListItem variant="inline" option={{ label: 'value 1', value: 'value 1' }}>value 1</ListItem>
		</ListWrapper>
	);

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should contain children item', () => {
		expect(component.find(ListItem)).toBeTruthy();
	})

	it('should have "button" style class', () => {
		component.setProps({ variant: 'block' })

		expect(component.hasClass('dropdown-button__menu')).toBeTruthy();
	})
});
