import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { ListItem } from '../../../../src/ui/common/molecules/oc-select/listItem';
import { ListWrapper } from '../../../../src/ui/common/molecules/oc-select/listWrapper';


describe('OcSelectComponent - list wrapper component', () => {
	const component: ShallowWrapper = shallow(
		<ListWrapper
			style={{ position: 'absolute' }}
			className=""
			data-popper-escaped={false}
			data-popper-placement="bottom-start"
			data-popper-reference-hidden={false}
		>
			<ListItem name="value_1">value 1</ListItem>
		</ListWrapper>
	);

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should contain children item', () => {
		expect(component.find(ListItem)).toBeTruthy();
	})
});
