import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { DropdownToggleProps } from 'react-bootstrap/DropdownToggle';

import { Toggle } from '../../../../src/ui/common/molecules/select/toggle';


const setUp = (props: DropdownToggleProps) => shallow(<Toggle {...props} />);

describe('Select - toggle component (common select)', () => {
	const component: ShallowWrapper = setUp({
		onClick: jest.fn(),
		className: 'some-class-name',
		disabled: false,
		'aria-expanded': false,
		'aria-haspopup': true,
		children: 'value',
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
