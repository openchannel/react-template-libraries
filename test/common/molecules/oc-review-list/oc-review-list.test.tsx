import * as React from 'react';
import { mount, shallow } from 'enzyme';

import { OcReviewListComponent } from '../../../../src/react-common-components/ui/common/index';

describe('OcReviewListComponent', () => {
	const component = shallow(
		<OcReviewListComponent
			reviewListTitle="Most recent reviews"
			reviewList={[
				{
					reviewOwnerName: 'Jon from Sales CRM',
					rating: 0,
					review: 'We love this app. very useful and easy to use!',
				},
			]}
			noReviewMessage="No Review for this app"
		/>,
	);

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should show reviews', () => {
		const component = mount(
			<OcReviewListComponent
				reviewListTitle="Most recent reviews"
				reviewList={[]}
				noReviewMessage="No Review for this app"
			/>,
		);
		component.setProps({
			reviewList: [
				{
					reviewOwnerName: 'Default',
					rating: 3,
					review: 'Default',
				},
			],
		});
		component.update();
		expect(component.prop('reviewList')).toEqual([
			{
				reviewOwnerName: 'Default',
				rating: 3,
				review: 'Default',
			},
		]);
	});

	it('should show empty data message and heading', () => {
		const component = mount(
			<OcReviewListComponent
				reviewListTitle="Most recent reviews"
				reviewList={[
					{
						reviewOwnerName: 'Jon from Sales CRM',
						rating: 0,
						review: 'We love this app. very useful and easy to use!',
					},
				]}
				noReviewMessage="No Review for this app"
			/>,
		);
		component.setProps({ reviewListTitle: 'home' });
		component.setProps({ noReviewMessage: 'This is only test description' });
		component.update();
		expect(component.prop('reviewListTitle')).toEqual('home');
		expect(component.prop('noReviewMessage')).toEqual('This is only test description');
	});
});
