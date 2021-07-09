import * as React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { OcSidebar } from '../../../../src/ui';

describe('OcSidebar', () => {
	it('should create', () => {
		const component = mount(
			<BrowserRouter>
				<OcSidebar sidebarModel={[]} />
			</BrowserRouter>,
		);
		expect(component).toBeTruthy();
	});

	it('should show icon', () => {
		const component = mount(
			<BrowserRouter>
				<OcSidebar
					sidebarModel={[
						{
							label: 'Category 1',
							checked: false,
						},
						{
							label: 'Category 2',
							checked: false,
						},
						{
							label: 'Category 3',
							checked: false,
							expanded: false,
						},
						{
							label: 'Category 4',
							checked: true,
						},
					]}
				/>
			</BrowserRouter>,
		);
		expect(component.find('img')).toBeTruthy();
	});
});
