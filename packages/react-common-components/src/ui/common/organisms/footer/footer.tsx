import * as React from 'react';
import { Link } from "react-router-dom";

import type { FooterColumn } from './types';

import './style.scss';

export const Footer = () => {
	const cmsData = {
		logoImageURL: '',
		columnsDFA: [] as FooterColumn[],
	};

	return (
		<div className="footer">
			<div className="container">
				<div className="footer-direction">
					<div className="company-logo">
						<img src={cmsData.logoImageURL} alt="footer-logo" className="company-logo" />
					</div>
					{
						cmsData.columnsDFA.map((column) => (
							<div className="info-column">
								<Link to={column.location || '/#'}>
									<h5>{column.label}</h5>
								</Link>
								<ul className="list-unstyled">
									{
										column.items.map((row) => (
											<li>
												<Link to={row.location}>{row.label}</Link>
											</li>
										))
									}
								</ul>

							</div>
						))
					}
					<div className="social-networks">
					{/*<oc-social-links [socialLinks]="socialLinks"></oc-social-links>*/}
					</div>
				</div>
				<h6 className="bottom-info">&#169; 2020 Your company. All rights reserved.</h6>
			</div>
		</div>
	);
};
