import * as React from 'react';
import { noop } from 'lodash';

import { OcButtonComponent } from '../../atoms/oc-button';

import type { NotFoundProps } from './types';

import './styles.scss';

export const NotFound: React.FC<NotFoundProps> = ({
	companyLogoUrl = '../../../../assets/img/company-logo-2x.png',
	errorImgUrl = '../../../../assets/img/not_found.svg',
	title = 'Page not found',
	description = 'The page you were looking for isn’t here',
	onClick = noop,
	buttonText = 'Go to home page',
}) => (
	<div className="main-container d-flex flex-column">
		<header>
			<div className="container">
				<img src={companyLogoUrl} className="logo" alt="Your company" />
			</div>
		</header>
		<div className="container mt-0 d-flex flex-column align-items-center justify-content-center">
			{errorImgUrl && (
				<img className="not-found-img w-100 mb-5" src={errorImgUrl} alt="Not found" />
			)}
			<h1 className="mt-3 mb-3">{title}</h1>
			<span className="subtitle mb-4">{description}</span>
			<div className="not-found__home-page-button">
				<OcButtonComponent onClick={onClick} customClass="button-255 mb-4">
					{buttonText}
				</OcButtonComponent>
			</div>
		</div>
	</div>
);
