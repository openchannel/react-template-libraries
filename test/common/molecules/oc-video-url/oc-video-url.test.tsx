import * as React from 'react';
import enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import {
	OcVideoUrlComponent,
	VideoUrlProps,
} from '../../../../src/ui/common/molecules/oc-video-url';

enzyme.configure({ adapter: new Adapter() });

const defaultProps: VideoUrlProps = {
	placeholder: 'Enter your video url here',
	videoUrl: 'https://www.youtube.com/watch?v=DGQwd1_dpuc',
	withoutPreview: false,
	onChange: (e) => e.target.value,
};

const setUp = (props: VideoUrlProps) => shallow(<OcVideoUrlComponent {...props} />);

describe('Video Url component', () => {
	let component: ShallowWrapper;

	beforeEach(() => {
		component = setUp(defaultProps);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should contain placeholder', () => {
		expect(component.prop('placeholder')).toEqual('Enter your video url here');
	});

	it('should be disabled', async () => {
		component.setProps({ disabled: true });

		expect(component.prop('disabled')).toBeTruthy();
	});

	it('should click', async () => {
		const onButtonClickMock = jest.fn();

		component.setProps({ onClick: onButtonClickMock });
		component.simulate('click');

		expect(onButtonClickMock).toHaveBeenCalledTimes(1);
	});
});

//write test to the end
