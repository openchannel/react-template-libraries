import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { OcError, OcErrorProps } from '../../../src/react-common-components/ui/common';


const setUp = (props: OcErrorProps) => shallow(<OcError {...props} />);

describe('OcError', () => {
	let component: ShallowWrapper;

	beforeEach(() => {
		component = setUp({});
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should render error', () => {
		component.setProps({ message: 'input should be not empty' });
		expect(component).toBeTruthy();
	});
});
