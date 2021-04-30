import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { ListItem, SelectListItemProps } from '../../../../src/ui/common/molecules/select/listItem';


const setUp = (props: SelectListItemProps) => shallow(<ListItem {...props} />);

describe('Select - list item component (common select)', () => {
	const component: ShallowWrapper = setUp({
		name: 'item_1',
		children: 'value',
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
