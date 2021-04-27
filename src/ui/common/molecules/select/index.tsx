import * as React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

import { Toggle } from './toggle';
import { ListItem } from './listItem';
import { ListWrapper } from './listWrapper';
import './styles.scss';


type ArrayElement<ArrayType extends readonly unknown[]> =
	ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export interface SelectProps {
	/**
	 * Array of the select items
	 */
	selectValArr: Array<ArrayElement<[ {[P in string]: string } | string ]>>;

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

	value: string;

	onChange: (event: React.SyntheticEvent) => void;

	onSelectionChange: (eventKey: (string | null), e: React.SyntheticEvent<unknown>) => void
}


export const Select: React.FC<Partial<SelectProps>> = (props) => {
	const {
		selectValArr = [{'some': 'some'}],
		labelField = 'some',
		disabled = false,
		// class = '',
		value = '',
		// onChange,
		onSelectionChange,
	} = props

	return (
		<Dropdown className="select-component">
			<Dropdown.Toggle as={Toggle} disabled={disabled}>
				{labelField && typeof value === 'object' ? value[labelField] : value}
			</Dropdown.Toggle>

			<Dropdown.Menu as={ListWrapper}>
				{
					labelField && typeof value === 'object' ? (
						selectValArr.map((item) => {
							return (
								<Dropdown.Item
									key={item[labelField]}
									name={item[labelField]}
									as={ListItem}
									onSelect={onSelectionChange}
								>
									{item[labelField]}
								</Dropdown.Item>
							)
						})
					) : (
						selectValArr.map((item) => {
							return (
								<Dropdown.Item
									key={item}
									name={item}
									as={ListItem}
									onSelect={onSelectionChange}
								>
									{item}
								</Dropdown.Item>
							)
						})
					)
				}
			</Dropdown.Menu>
		</Dropdown>
	)
}
