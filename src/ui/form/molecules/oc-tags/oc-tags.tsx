//commit a5d181b1d4b8bb6627fa44f4a3b0fe4d4218248f Author: Julia Date: 14.05.21, 20:21
import * as React from 'react';
import difference from 'lodash/difference';
import orderBy from 'lodash/orderBy';

import { OcButtonComponent, OcDropboxComponent, OcTagElement } from '../../../common';

import { useTagDropboxState } from './hooks';
import { OcTagsProps } from './types';
import { normalizeTags } from './utils';

import './styles.scss';

export const OcTags: React.FC<OcTagsProps> = (props) => {
	const { availableTags, value = [], onChange, tagsType = 'string', placeholder = '' } = props;

	const setNormalizedValues = React.useCallback(
		(values) => {
			onChange(normalizeTags(values, tagsType));
		},
		[onChange, tagsType],
	);

	const onSelectTag = React.useCallback(
		(selectedTag: string) => {
			setNormalizedValues([...value, selectedTag]);
		},
		[setNormalizedValues, value],
	);

	const onRemoveTag = React.useCallback(
		(selectedTag: string) => {
			setNormalizedValues(value.filter((item) => String(item) !== selectedTag));
		},
		[setNormalizedValues, value],
	);

	const { inputValue, resetInputValue, onInputChange, onKeyDown } = useTagDropboxState({
		createTag: onSelectTag,
	});

	const onAddTag = React.useCallback(() => {
		if (!inputValue) return;

		setNormalizedValues([...value, inputValue]);
		resetInputValue();
	}, [setNormalizedValues, value, inputValue]);

	const dropboxOptions = React.useMemo(() => {
		return orderBy(difference(availableTags, value)).map(String);
	}, [availableTags, value]);

	return (
		<div className="tags">
			<div className="tags__group">
				<div className="tags__group-wrapper">
					<OcDropboxComponent
						className="tags__select"
						placeholder={placeholder}
						items={dropboxOptions}
						selectItem={onSelectTag}
						selectedItem=""
						inputValue={inputValue}
						onInputChange={onInputChange}
						onKeyDown={onKeyDown}
					/>
					<div className="tags__button-add">
						<OcButtonComponent type="secondary" onClick={onAddTag}>
							Add
						</OcButtonComponent>
					</div>
				</div>
			</div>
			{value.length > 0 && (
				<div className="tags__list">
					{value.map((item) => (
						<span key={String(item)} className="tags__list-item">
							<OcTagElement title={String(item)} onIconClick={onRemoveTag} />
						</span>
					))}
				</div>
			)}
		</div>
	);
};
