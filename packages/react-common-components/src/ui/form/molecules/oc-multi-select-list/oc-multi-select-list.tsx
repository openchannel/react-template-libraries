//commit 240aa1e72cb6b2f67e9148e5d21917065b56fb19 Author: Julia Date: 12.05.21, 18:29
import * as React from 'react';
import { difference, isEqual, orderBy, union } from 'lodash-es';

import { DropboxValue } from '../../../common';
import OcDropboxComponent from '../../../common/atoms/oc-dropbox/oc-dropbox';
import OcTagElement from '../../../common/atoms/oc-tag-element/oc-tag-element';

import { OcMultiSelectListProps } from './types';

import './styles.scss';

const OcMultiSelectList: React.FC<OcMultiSelectListProps> = (props) => {
	const {
		name,
		label,
		availableItemsList,
		defaultItems = [],
		value = [],
		onChange,
		onBlur,
	} = props;

	const prevValue = React.useRef(value);
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
		if (!isEqual(prevValue.current, value)) {
			// remove selected items from options
			const allOptions = defaultItems ? union(availableItemsList, defaultItems) : [];
			const notSelectedOptions = difference(allOptions, value);

			setOptions(orderBy(notSelectedOptions));
			prevValue.current = value;
		}
	}, [value]);

	const onSelectItem = (selectedItem: DropboxValue) => {
		onChange([...value, selectedItem]);
	};

	const onRemoveSelectedItem = (selectedValue: string) => {
		onChange(value.filter((item) => item !== selectedValue));
	};

	return (
		<div className="multiselect">
			<OcDropboxComponent
				name={name}
				className="multiselect__dropbox"
				placeholder={label ? `Select ${label}` : ''}
				items={options}
				selectItem={onSelectItem}
				selectedItem=""
				onBlur={onBlur}
			/>
			{value.map((item) => (
				<span key={item} className="multiselect__tag">
					<OcTagElement title={item} onIconClick={onRemoveSelectedItem} />
				</span>
			))}
		</div>
	);
};

export default OcMultiSelectList;
