import * as React from 'react';
import { mount, shallow, ShallowWrapper } from 'enzyme';
import { DropboxProps, DropboxValue } from '@openchannel/react-common-components/src/ui';
import OcDropboxComponent from '../../../src/ui/common/atoms/oc-dropbox/oc-dropbox';

const defaultDropboxProps: DropboxProps = {
	placeholder: 'Default placeholder',
	items: ['first', 'second', 'third'],
	className: 'oc-dropbox',
	classNamePrefix: 'oc-dropbox',
	isSearchable: true,
	disabled: false,
	selectedItem: 'first',
	selectItem: (item: DropboxValue): DropboxValue => item,
};

const setUp = (props: DropboxProps) => shallow(<OcDropboxComponent {...props} />);

describe('OcDropboxComponent', () => {
	let component: ShallowWrapper;

	beforeEach(() => {
		component = setUp(defaultDropboxProps);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should contain placeholder', () => {
		expect(component.prop('placeholder')).toEqual('Default placeholder');
	});

	it('should contain 3 options and be clicked', () => {
		const wrapper = mount(<OcDropboxComponent {...defaultDropboxProps} />);
		wrapper.find('svg').simulate('mouseDown', {
			button: 0,
		});
		expect(wrapper.find('.oc-dropbox__option').length).toEqual(6);
	});
});
