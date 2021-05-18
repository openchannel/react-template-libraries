import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { OcTagElement, OcTagElementProps } from '../../../src/ui/common';


const setUp = (props: OcTagElementProps) => shallow(<OcTagElement {...props} />);

describe('OcTagElement', () => {
	let component: ShallowWrapper;

	beforeEach(() => {
		component = setUp({ title: 'my-tag' });
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should click on icon and fire title', () => {
		const onIconClickMock = jest.fn();

		component.setProps({
			onIconClick: onIconClickMock,
		});

		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		component.find('span.tag-element__close-icon').props().onClick();

		expect(onIconClickMock).toHaveBeenCalledWith('my-tag');
	});

	it('should render custom icon', () => {
		component.setProps({
			onIconClick: jest.fn(),
			deleteTagImgUrl: 'custom-icon-path',
		});

		expect(component.find('img').props()).toHaveProperty('src', 'custom-icon-path')
	});
});
