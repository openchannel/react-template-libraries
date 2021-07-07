import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { Modal, ModalProps } from '../../../src/react-common-components/ui/common';


const setUp = (props: ModalProps) => shallow(<Modal {...props} />);


describe('Modal (common modal)', () => {
	it('should create', () => {
		const component: ShallowWrapper = setUp({
			isOpened: false,
			onClose: jest.fn(),
			children: 'some content',
		});

		expect(component).toBeTruthy();
	});

	it('should create with additional props: size and className', () => {
		const component: ShallowWrapper = setUp({
			isOpened: true,
			onClose: jest.fn(),
			children: 'some content',
			size: 'lg',
			className: 'some-class'
		});

		expect(component).toBeTruthy();
	});
});
