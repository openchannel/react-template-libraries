import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { ListItem, ListItemProps } from '../../../../src/ui/common/molecules/dropdown/listItem';


const setUp = (props: ListItemProps) => shallow(<ListItem {...props} />);

describe('Dropdown - list item component (common dropdown)', () => {
	const component: ShallowWrapper = setUp({
		variant: 'inline',
		children: 'value',
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should have empty style class prop', () => {
		component.setProps({ variant: 'block' });

		expect(component.hasClass('')).toBeTruthy();
	});
});