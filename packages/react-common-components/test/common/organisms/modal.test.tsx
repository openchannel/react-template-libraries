import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { ModalProps } from '@openchannel/react-common-components/src/ui';
import Modal from '../../../src/ui/common/organisms/modal/modal';

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
			className: 'some-class',
		});

		expect(component).toBeTruthy();
	});
});
