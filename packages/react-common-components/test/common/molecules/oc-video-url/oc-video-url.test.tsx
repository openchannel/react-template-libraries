import * as React from 'react';
import { shallow, mount, ShallowWrapper } from 'enzyme';
import OcVideoUrlComponent from '../../../../src/ui/common/molecules/oc-video-url/oc-video-url';

const component: ShallowWrapper = shallow(
	<OcVideoUrlComponent
		placeholder="Enter your video url here"
		value="https://www.youtube.com/watch?v=DGQwd1_dpuc"
		withoutPreview={false}
		disabled={false}
		onChange={(e: any) => e.target.value}
	/>,
);

describe('Video Url component', () => {
	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should contain placeholder', () => {
		const wrapper = mount(
			<OcVideoUrlComponent
				placeholder="Enter your video url here"
				value="https://www.youtube.com/watch?v=DGQwd1_dpuc"
				withoutPreview={false}
				disabled={false}
				onChange={(e: any) => e.target.value}
			/>,
		);
		expect(wrapper.prop('placeholder')).toEqual('Enter your video url here');
		wrapper.unmount();
	});
});
