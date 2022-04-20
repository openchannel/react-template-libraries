import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { OcTagElementProps } from '@openchannel/react-common-components/src/ui';
import OcTagElement from '../../../src/ui/common/atoms/oc-tag-element/oc-tag-element';

const setUp = (props: OcTagElementProps) => shallow(<OcTagElement {...props} />);

describe('OcTagElement', () => {
	let component: ShallowWrapper;

	beforeEach(() => {
		component = setUp({ title: 'my-tag' });
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should click/keyDown on icon and fire title', () => {
		const onIconClickMock = jest.fn();

		component.setProps({
			onIconClick: onIconClickMock,
		});

		const closeIconWrapper = component.find('span.tag-element__close-icon');

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		closeIconWrapper.props().onClick();
		expect(onIconClickMock).toHaveBeenCalledWith('my-tag');

		closeIconWrapper.simulate('keydown', { key: 'Enter' });
		expect(onIconClickMock).toHaveBeenCalledWith('my-tag');
	});

	it('should render custom icon', () => {
		component.setProps({
			onIconClick: jest.fn(),
			deleteTagImgUrl: 'custom-icon-path',
		});

		expect(component.find('img').props()).toHaveProperty('src', 'custom-icon-path');
	});
});
