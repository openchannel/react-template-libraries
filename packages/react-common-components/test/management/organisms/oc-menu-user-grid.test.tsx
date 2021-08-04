import * as React from 'react';
import { mount } from 'enzyme';
import { OcMenuUserGridProps } from '@openchannel/react-common-components';
import OcMenuUserGrid from 'packages/react-common-components/src/ui/management/organisms/oc-menu-user-grid/oc-menu-user-grid';
import OcDropdownButton from '../../../src/ui/common/molecules/oc-dropdown/oc-dropdown-button';

// @ts-ignore
import { ocMenuUserGridPropertiesMock } from './mocks';

const setUp = (props: OcMenuUserGridProps) => mount(<OcMenuUserGrid {...props} />);

describe('OcMenuUserGrid', () => {
	const onMenuClickMock = jest.fn();
	const onSortMock = jest.fn();

	beforeEach(() => {
		jest.clearAllMocks();
	});

	it('should render', () => {
		const wrapper = setUp({
			properties: ocMenuUserGridPropertiesMock,
			onMenuClick: onMenuClickMock,
			onSort: onSortMock,
		});
		expect(wrapper.find('.user-grid-container')).toBeTruthy();
	});

	it('should render empty-data-row component', () => {
		const wrapper = setUp({
			properties: {
				...ocMenuUserGridPropertiesMock,
				data: {
					...ocMenuUserGridPropertiesMock.data,
					list: [],
				},
			},
			onMenuClick: onMenuClickMock,
			onSort: onSortMock,
		});
		expect(wrapper.find('.user-table__row').find('.user-table__text').text()).toBe(
			'No Users Found',
		);
	});

	it('should fire callback if user clicks on table-head-cell', () => {
		const wrapper = setUp({
			properties: ocMenuUserGridPropertiesMock,
			onMenuClick: onMenuClickMock,
			onSort: onSortMock,
		});

		const tableHeadColumnCell = wrapper
			.find('.user-table__head-cell.user-table__head-name')
			.find('div[role="button"]');
		tableHeadColumnCell.simulate('click');
		expect(onSortMock).toHaveBeenCalledWith('name');
	});

	it('should fire callback if user clicks on dropdown menu item', () => {
		const wrapper = setUp({
			properties: ocMenuUserGridPropertiesMock,
			onMenuClick: onMenuClickMock,
			onSort: onSortMock,
		});

		const rowDropdownMenu = wrapper.find('.user-table__menu').at(0).find(OcDropdownButton);
		// open dropdown menu
		rowDropdownMenu.find('div[role="button"]').simulate('click');
		// click on dropdown menu item
		wrapper.find('button.menu-edit.dropdown-item').simulate('click');
		expect(onMenuClickMock).toHaveBeenCalledWith({
			action: 'EDIT',
			inviteId: undefined,
			inviteToken: undefined,
			userAccountId: 'undefined_account_id',
			userId: 'undefined_id',
		});
	});
});
