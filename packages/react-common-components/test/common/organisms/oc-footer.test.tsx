import * as React from 'react';
import { mount } from 'enzyme';
import { Link, BrowserRouter } from 'react-router-dom';

import { OcFooter, OcFooterProps } from '../../../src/ui/common/organisms';

const setUp = (props: OcFooterProps) => mount(
	<BrowserRouter>
		<OcFooter {...props} />
	</BrowserRouter>
);

describe('OcFooter', () => {
	it('should create', () => {
		const wrapper = setUp({
			cmsData: {
				logoImageURL: '',
				columnsDFA: [],
			},
		});

		expect(wrapper).toBeTruthy();
		// anyway render img with default alt
		expect(wrapper.find('img').props().src).toBe('');
		//check render empty columnsDFA
		expect(wrapper.find('.info-column')).toHaveLength(0);
	});

	it('render with props', () => {
		const wrapper = setUp({
			cmsData: {
				logoImageURL: '',
				columnsDFA: [
					{
						label: 'Browse',
						location: '',
						items: [
							{
								label: 'Most Popular',
								location: '/most-popular',
							},
						],
					},
				],
			},
		});

		//insert default link path if 'location' is invalid
		// @ts-ignore
		expect((wrapper.find('.info-column').find(Link).at(0) as unknown as typeof Link).props().to).toBe('/#');
		expect(wrapper.find('.info-column').find('.list-unstyled')).toHaveLength(1);
	});

	it('render with social links', () => {
		const wrapper = setUp({
			cmsData: {
				logoImageURL: '',
				columnsDFA: [
					{
						label: 'Browse',
						location: '',
						items: [
							{
								label: 'Most Popular',
								location: '/most-popular',
							},
						],
					},
				],
			},
			socialLinks: [
				{
					link: 'https://facebook.com',
					iconSrc: 'https://dev1-template-market.openchannel.io/assets/img/facebook-icon.svg',
					iconAlt: '',
				},
			],
		});

		expect(wrapper.find('.social-networks').find('a').props().href).toBe('https://facebook.com');
	});
});
