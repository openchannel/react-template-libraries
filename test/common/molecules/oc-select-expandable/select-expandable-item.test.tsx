import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import {
	ExpandableListItem,
	SelectModel,
} from '../../../../src/react-common-components/ui/common/molecules/oc-select-expandable/expandable-select-item';

const setUp = (props: SelectModel) => shallow(<ExpandableListItem {...props} />);

describe('Item for expandable select', () => {
	const component: ShallowWrapper = setUp({
		label: 'Category 1',
		checked: false,
		name: '1',
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should trigger onChange', async () => {
		const onButtonClickMock = jest.fn();

		component.setProps({ onChange: onButtonClickMock });
		component.find('input').simulate('change', []);

		expect(onButtonClickMock).toHaveBeenCalled();
	});
});
