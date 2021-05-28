import * as React from 'react';

import { OcButtonComponent } from '../../../common';

import { OcDynamicFieldArrayProps } from './types';

import './style.scss';

export const OcDynamicFieldArray: React.FC<OcDynamicFieldArrayProps> = (props) => {
	const { dfaFormArray } = props;

	return (
		<div className="cards-interface">
			{
				dfaFormArray && dfaFormArray.controls.length > 0 && (
					<div className="cards-interface__added-item">

					</div>
				)
			}
			<OcButtonComponent htmlType="button" type="primary">
				Add
			</OcButtonComponent>
		</div>
	);
}
