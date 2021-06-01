import * as React from 'react';

import EditIconSvg from '../../../../assets/img/edit.svg';
import TrashIconSvg from '../../../../assets/img/trash-icon.svg';
import { OcDynamicArrayPreview } from '../oc-dynamic-array-preview';
import { useOcFormContext } from '../oc-form/context';

import './style.scss';

export const OcDynamicArrayItem: React.FC<any> = (props) => {
	const { elementName, fieldLabel, index, fields, onDelete } = props;

	const context = useOcFormContext();

	const onStartEditing = () => {
		context.toggleEditingField(elementName);
	}

	return (
		<div className="form-card">
			<div className="form-card__header">
				<h3 className="form-card__header-text">{fieldLabel}</h3>
				<div className="form-card__icons-handler">
					<div className="form-card__icon" onClick={onStartEditing}>
						<EditIconSvg />
					</div>
					<div className="form-card__icon" onClick={onDelete}>
						<TrashIconSvg />
					</div>
				</div>
			</div>

			<OcDynamicArrayPreview fields={fields} />
		</div>
	)
};
