//commit a5d181b1d4b8bb6627fa44f4a3b0fe4d4218248f Author: Julia Date: 14.05.21, 20:21
import * as React from 'react';

// import { OcDropboxComponent, OcTagElement, DropboxValue } from '../../../common';
import './styles.scss';


export const OcTags: React.FC<any> = (props) => {
	const {

	} = props;

	return (
		<div className="multiselect">
			{/*<OcDropboxComponent*/}
			{/*	className="multiselect__dropbox"*/}
			{/*	placeholder={`Select ${label}`}*/}
			{/*	items={options}*/}
			{/*	selectItem={onSelectItem}*/}
			{/*	selectedItem=""*/}
			{/*/>*/}
			{/*{*/}
			{/*	value.map((item) => (*/}
			{/*		<span key={item} className="multiselect__tag">*/}
			{/*			<OcTagElement title={item} onIconClick={onRemoveSelectedItem} />*/}
			{/*		</span>*/}
			{/*	))*/}
			{/*}*/}
		</div>
	);
}
