//commit a5d181b1d4b8bb6627fa44f4a3b0fe4d4218248f Author: Julia Date: 14.05.21, 20:21
import * as React from 'react';
import { difference, orderBy } from 'lodash-es';

import OcButtonComponent from '../../../common/atoms/oc-button/oc-button';
import OcDropboxComponent from '../../../common/atoms/oc-dropbox/oc-dropbox';
import OcTagElement from '../../../common/atoms/oc-tag-element/oc-tag-element';

import { useTagDropboxState } from './hooks';
import { OcTagsProps } from './types';
import { normalizeTags } from './utils';

import './styles.scss';

const OcTags: React.FC<OcTagsProps> = (props) => {
	const {
		name,
		customClass = '',
		availableTags,
		value = [],
		onChange,
		tagsType = 'string',
		placeholder = '',
		onBlur,
	} = props;

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
		const mergedArr = availableTags!.map((item) => {
			if('value' in item) {
				return item.value;
			}
			return item;
		});
		return orderBy(difference(mergedArr, value)).map(String);
	}, [availableTags, value]);

	return (
		<div className="tags">
			<div className="tags__group">
				<div className="tags__group-wrapper">
					<OcDropboxComponent
						name={name}
						className={`tags__select ${customClass}`}
						placeholder={placeholder}
						items={dropboxOptions}
						selectItem={onSelectTag}
						selectedItem=""
						inputValue={inputValue}
						onInputChange={onInputChange}
						onKeyDown={onKeyDown}
						onBlur={onBlur}
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

export default OcTags;
