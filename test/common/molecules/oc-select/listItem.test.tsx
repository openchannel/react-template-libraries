import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { ListItem, SelectListItemProps } from '../../../../src/ui/common/molecules/oc-select/listItem';


const setUp = (props: SelectListItemProps) => shallow(<ListItem {...props} />);

describe('OcSelect - list item component', () => {
	const component: ShallowWrapper = setUp({
		name: 'item_1',
		children: 'value',
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
