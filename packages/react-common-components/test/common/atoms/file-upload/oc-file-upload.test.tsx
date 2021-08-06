//@ts-nocheck
import * as React from 'react';
import { mount, shallow, ShallowWrapper } from 'enzyme';
import OcFileUpload from '@openchannel/react-common-components';

const setUp = () =>
	shallow(<OcFileUpload maxFiles={1} minSizeBytes={0} maxSizeBytes={5000} accept="*" />);

describe('Default file uploader', () => {
	let component: ShallowWrapper;

	beforeEach(() => {
		component = setUp();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should contain text value', () => {
		expect(component.contains('Browse file'));
	});

	it('Should click', async () => {
		const wrapper = mount(<OcFileUpload />);
		const dropzone = wrapper.find('input');
		dropzone.simulate('click');
		expect(dropzone).toHaveBeenCalled;
	});
});
