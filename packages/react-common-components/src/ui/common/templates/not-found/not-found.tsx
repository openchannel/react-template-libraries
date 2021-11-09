import * as React from 'react';
import { noop } from 'lodash';

import { OcButtonComponent } from '../../atoms/oc-button';

import type { NotFoundProps } from './types';

import './styles.scss';

export const NotFound: React.FC<NotFoundProps> = ({
	errorImgUrl = '../../../../assets/img/not-found-404.svg',
	title = 'Page not found',
	description = 'The page you were looking for isn’t here',
	onClick = noop,
	buttonText = 'Go to home page',
	buttonClassName = ''
}) => (
	<div className="main-container">
		<div className="container mt-0 d-flex flex-column align-items-center">
			{errorImgUrl && (
				<img className="not-found-icon" src={errorImgUrl} alt="Not found 404" />
			)}
			<h1 className="mt-3 mb-3 text-center">{title}</h1>
			<span className="subtitle mb-4 text-center">{description}</span>
			<div className="not-found__home-page-button">
				<OcButtonComponent onClick={onClick} customClass={buttonClassName}>
					{buttonText}
				</OcButtonComponent>
			</div>
		</div>
	</div>
);
