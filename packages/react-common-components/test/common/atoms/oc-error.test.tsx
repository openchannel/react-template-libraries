import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { OcErrorProps } from '@openchannel/react-common-components';
import OcError from 'packages/react-common-components/src/ui/common/atoms/oc-error/oc-error';

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
