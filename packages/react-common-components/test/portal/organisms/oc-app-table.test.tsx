import * as React from 'react';
import { mount } from 'enzyme';
import { act } from 'react-dom/test-utils';

// @ts-ignore
import CustomArrowDownIcon from '../../../src/react-common-components/assets/img/select-down.svg';
// @ts-ignore
import CustomArrowUpIcon from '../../../src/react-common-components/assets/img/select-up.svg';
import OcDropdownButton from '../../../src/ui/common/molecules/oc-dropdown/oc-dropdown-button';
import { OcAppTableProps } from '../../../src';
import OcAppTable from '../../../src/ui/portal/organisms/oc-app-table/oc-app-table';

// @ts-ignore
import { mockData } from './mocks';

const setUp = (props: OcAppTableProps) => mount(<OcAppTable {...props} />);

describe('OcAppTable', () => {
	let wrapper: any;

	const onSortMock = jest.fn();
	const onMenuClickMock = jest.fn();

	beforeEach(() => {
		wrapper = setUp({
			properties: mockData,
			onSort: onSortMock,
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should render', () => {
		expect(wrapper).toBeTruthy();
	});

	it('should onSort callback fire sort-key', () => {
		wrapper.find('.oc-table__th.oc-table__name').simulate('click');
		expect(onSortMock).toHaveBeenCalledWith('name');
		wrapper.find('.oc-table__th.oc-table__data').simulate('click');
		expect(onSortMock).toHaveBeenCalledWith('created');
		wrapper.find('.oc-table__th.oc-table__status').simulate('click');
		expect(onSortMock).toHaveBeenCalledWith('status.value');
	});

	it('should callback app data when user clicks on app name', () => {
		wrapper.setProps({ onMenuClick: onMenuClickMock });

		wrapper.find('span[aria-label="Edit application"]').at(0).simulate('click');
		expect(onMenuClickMock).toHaveBeenCalledWith({
			action: 'EDIT',
			appId: '5f22dd91b5ad376fff8431a7',
			appVersion: 1,
			isChild: false,
		});
	});

	it('should fire callback if user clicks on dropdown menu item', () => {
		wrapper.setProps({ onMenuClick: onMenuClickMock });

		const rowDropdownMenu = wrapper.find('.oc-table__dropdown').at(0).find(OcDropdownButton);
		// open dropdown menu
		rowDropdownMenu.find('div[role="button"]').simulate('click');
		// click on dropdown menu item
		wrapper.find('button.menu-edit.dropdown-item').simulate('click');
		expect(onMenuClickMock).toHaveBeenCalledWith({
			action: 'EDIT',
			appId: '5f22dd91b5ad376fff8431a7',
			appVersion: 1,
			isChild: false,
		});
	});

	it('should render correct sort icon and change it after user clicks onSort', () => {
		// test custom icons as string
		wrapper.setProps({
			ascendingSortIcon: 'path-to/asc-icon.png',
			descendingSortIcon: 'path-to/desc-icon.png',
		});
		expect(wrapper.find('img.oc-table__icon-down').at(0).props().src).toBe('path-to/desc-icon.png');
		act(() => {
			wrapper.find('.oc-table__th.oc-table__name').simulate('click');
		});
		expect(wrapper.find('img.oc-table__icon-up').at(0).props().src).toBe('path-to/asc-icon.png');

		// test custom icons as svg component
		wrapper.setProps({
			ascendingSortIcon: <CustomArrowDownIcon />,
			descendingSortIcon: <CustomArrowUpIcon />,
		});
		expect(
			wrapper.find('.oc-table__th.oc-table__name').at(0).find(CustomArrowDownIcon),
		).toHaveLength(1);
		act(() => {
			wrapper.find('.oc-table__th.oc-table__name').simulate('click');
		});
		expect(wrapper.find('.oc-table__th.oc-table__name').at(0).find(CustomArrowUpIcon)).toHaveLength(
			1,
		);
	});
});
