import * as React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { VideoProps } from '@openchannel/react-common-components/src/ui';
import OcVideoComponent from '@openchannel/react-common-components/src/ui/common/atoms/oc-video/oc-video';

const defaultVideoProps: VideoProps = {
	videoUrl: 'https://www.youtube.com/embed/DGQwd1_dpuc',
};

const setUp = (props: VideoProps) => shallow(<OcVideoComponent {...props} />);

describe('Embedded iframe video', () => {
	let component: ShallowWrapper;

	beforeEach(() => {
		component = setUp(defaultVideoProps);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should contain video url', () => {
		expect(component.contains('https'));
	});
});
