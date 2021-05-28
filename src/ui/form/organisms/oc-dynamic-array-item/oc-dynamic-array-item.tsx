import * as React from 'react';

import EditIconSvg from '../../../../assets/img/edit.svg';
import TrashIconSvg from '../../../../assets/img/trash-icon.svg';

import './style.scss';

export const OcDynamicArrayItem: React.FC<any> = (props) => {
const { fieldLabel } = props;


	return (
		<div className="form-card">
			<div className="form-card__header">
				<h3 className="form-card__header-text">{fieldLabel}</h3>
				<div className="form-card__icons-handler">
					<EditIconSvg className="form-card__icon" />
					<TrashIconSvg className="form-card__icon" />
				</div>

			</div>
		</div>
	)
};
