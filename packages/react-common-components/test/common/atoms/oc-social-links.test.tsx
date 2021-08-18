import * as React from 'react';
import { mount } from 'enzyme';

import { OcSocialLinks, OcSocialLinksProps } from '../../../src/ui/common';

const setUp = (props: OcSocialLinksProps) => mount(<OcSocialLinks {...props} />);

const mockLink = {
	link: 'https://facebook.com',
	iconSrc: 'https://dev1-template-market.openchannel.io/assets/img/facebook-icon.svg',
	iconAlt: 'custom alt',
};

describe('OcSocialLinks', () => {
	it('should render nothing if link array is empty', () => {
		const wrapper = setUp({ links: [] });

		expect(wrapper.find('.social-links')).toHaveLength(0);
	});

	it('should render nothing', () => {
		const wrapper = setUp({ links: [ mockLink ] });

		expect(wrapper.find('.social-links__item')).toHaveLength(1);
		expect(wrapper.find('.social-links__item').props().href).toBe('https://facebook.com');
		expect(wrapper.find('.social-links__item').find('img').props().src).toBe('https://dev1-template-market.openchannel.io/assets/img/facebook-icon.svg');

		// should render passed image alt
		expect(wrapper.find('.social-links__item').find('img').props().alt).toBe('custom alt');

		wrapper.setProps({ links: [ { ...mockLink, iconAlt: '' } ] });
		// should generate alt by the link
		expect(wrapper.find('.social-links__item').find('img').props().alt).toBe('facebook.com social-media');
	});
});
