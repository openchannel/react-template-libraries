import * as React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import { ListWrapper } from './listWrapper';
import { ListItem } from './listItem';
import { Toggle } from './toggle';
import './styles.scss';


export interface SelectProps {
	/**
	 * Array of the select items
	 */
	selectValArr: string[] | object[];

	/**
	 * Set object field name using as label
	 */
	labelField?: string;

	/**
	 * Disable select for user input
	 */
	disabled: boolean;

	/**
	 * Add string of public classes to the existed
	 */
	class?: string;

	value: string | Record<string, string>;

	onChange: (event: React.SyntheticEvent) => void;
	onSelectionChange: (eventKey: (string | null), e: React.SyntheticEvent<unknown>) => void
}

export const Select: React.FC<Partial<SelectProps>> = (props) => {
	const {
			selectValArr = [],
			labelField,
			disabled = false,
			class = '',
		value = '',
		onChange,
		onSelectionChange,
		} = props

	const selectValArr

	if (labelField) {

	}


	//
	// const [selectedValue, setSelectedValue] = React.useState(value)

	// const onSelect = React.use(e, e2) => {
	// 	console.log('e', e)
	// 	console.log('args', e2)
	// }
	const options = React.memo(() => {
		if (labelField) {
			return selectValArr
		} else {
			return selectValArr.reduce((acc, item) => (),[])
		}
	}, [labelField, selectValArr])

	return (
		<Dropdown className="select-component">
			<Dropdown.Toggle as={Toggle} disabled={disabled}>
				{labelField && typeof value === 'object' ? value[labelField] : value}
			</Dropdown.Toggle>

			<Dropdown.Menu as={ListWrapper}>
				{
					selectValArr.map((item) => (
						<Dropdown.Item
							key={item}
							name={item}
							as={ListItem}
							onSelect={onSelectionChange}
						>
							{item}
						</Dropdown.Item>
					))
				}
			</Dropdown.Menu>
		</Dropdown>
	)
}
