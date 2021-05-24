//commit 240aa1e72cb6b2f67e9148e5d21917065b56fb19 Author: Julia Date: 12.05.21, 18:29
import * as React from 'react';
import union from 'lodash/union';
import orderBy from 'lodash/orderBy';
import difference from 'lodash/difference';

import { OcMultiSelectListProps } from './types';
import { OcDropboxComponent, OcTagElement, DropboxValue } from '../../../common';
import './styles.scss';


export const OcMultiSelectList: React.FC<OcMultiSelectListProps> = (props) => {
	const {
		label,
		availableItemsList,
		defaultItems = [],
		value = [],
		onChange,
	} = props;

	const [options, setOptions] = React.useState<string[]>(availableItemsList);

	React.useEffect(() => {
		if (!defaultItems) return;

		const diff = difference(defaultItems, value);

		if (diff.length > 0) {
			// fire defaultItems to 'selected items' as default value
			// (merge defaultItems and values)
			onChange(union(defaultItems, value));
		}
	}, []);

	React.useEffect(() => {
		// remove selected items from options
		const allOptions = defaultItems ? union(availableItemsList, defaultItems) : [];
		const notSelectedOptions = difference(allOptions, value);

		setOptions(orderBy(notSelectedOptions));
	}, [value])

	const onSelectItem = (selectedItem: DropboxValue) => {
		onChange([ ...value, selectedItem ]);
	};

	const onRemoveSelectedItem = (selectedValue: string) => {
		onChange(value.filter(item => item !== selectedValue));
	};

	return (
		<div className="multiselect">
			<OcDropboxComponent
				className="multiselect__dropbox"
				placeholder={label ? `Select ${label}` : ''}
				items={options}
				selectItem={onSelectItem}
				selectedItem=""
			/>
			{
				value.map((item) => (
					<span key={item} className="multiselect__tag">
						<OcTagElement title={item} onIconClick={onRemoveSelectedItem} />
					</span>
				))
			}
		</div>
	);
}
