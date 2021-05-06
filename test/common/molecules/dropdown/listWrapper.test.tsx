import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { ListItem } from '../../../../src/ui/common/molecules/dropdown/listItem';
import { ListWrapper } from '../../../../src/ui/common/molecules/dropdown/listWrapper';


describe('Dropdown - list wrapper component (common dropdown)', () => {
	const component: ShallowWrapper = shallow(
		<ListWrapper
			variant="inline"
			style={{ position: 'absolute' }}
			className=""
		>
			<ListItem variant="inline">value 1</ListItem>
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
