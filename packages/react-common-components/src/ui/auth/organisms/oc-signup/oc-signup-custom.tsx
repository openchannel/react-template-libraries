import * as React from 'react';
import { Link } from 'react-router-dom';

import OcButtonComponent from '../../../common/atoms/oc-button/oc-button';
import OcLabelComponent from '../../../common/atoms/oc-label/oc-label';
import OcEditUserFormComponent from '../oc-edit-user-form';

import { SignupProps } from './types';

import './style.scss';

export const OcSignupComponent: React.FC<SignupProps> = (props) => {
	const {
		onSubmit,
		formConfigs,
		loginUrl,
		forgotPasswordDoneUrl,
		goToActivationPage,
		defaultTypeLabelText,
		ordinaryTermsDescription,
		customTermsDescription,
		defaultEmptyConfigsErrorMessage,
		showFeedback = false,
		companyLogoUrl = '../../../../assets/img/logo-company.png',
		enableTermsCheckbox = false,
		enablePasswordField = true,
	} = props;

	const [_showFeedback, setShowFeedback] = React.useState(showFeedback);

	React.useEffect(() => {
		setShowFeedback(showFeedback);
	}, [showFeedback]);

	const handleShowFeedback = React.useCallback(() => setShowFeedback((prev) => !prev), []);

	return (
		<div className="sign-up login-card login-card_borders">
			{!_showFeedback && (
				<div>
					<div className="sign-up__card-body">
						<div className="sign-up__logo">
							<img alt="logo" className="sign-up__logo-img company-logo" src={companyLogoUrl} />
						</div>
						<div className="sign-up__header">
							<h4 className="sign-up__header-heading">Sign Up</h4>
							<OcLabelComponent
								text="Enter your account details below"
								customClass="sign-up__header-invitation"
							/>
						</div>
						{formConfigs !== null && (
							<div>
								<OcEditUserFormComponent
									formConfigs={formConfigs}
									defaultTypeLabelText={defaultTypeLabelText}
									customTermsDescription={customTermsDescription}
									ordinaryTermsDescription={ordinaryTermsDescription}
									onSubmit={onSubmit}
									enableTermsCheckbox={enableTermsCheckbox}
									enablePasswordField={enablePasswordField}
									defaultEmptyConfigsErrorMessage={defaultEmptyConfigsErrorMessage}
									submitButtonText="Sign Up"
								/>
							</div>
						)}
						{loginUrl && (
							<div className="sign-up__login">
								Already have an account?{' '}
								<Link className="sign-up__login-link" to={loginUrl}>
									Log In
								</Link>
							</div>
						)}
					</div>
				</div>
			)}

			{_showFeedback && (
				<form>
					<div className="sign-up__card-body result">
						<div className="sign-up__logo result__logo">
							<img alt="logo" className=" company-logo" src={companyLogoUrl} />
						</div>
						<div className="result__message">
							<img
								alt="dropdown-icon"
								className="result__message-img"
								src={forgotPasswordDoneUrl}
							/>
							<h4 className="result__message-heading">Done!</h4>
							<OcLabelComponent text="An activation email has been sent to your inbox." />
						</div>
						<OcButtonComponent
							onClick={goToActivationPage}
							text="Activate account"
							customClass="sign-up__button"
						/>
						<div className="result__sign-up-message">
							<OcLabelComponent text="Don't have an account yet?" />
							<span
								role="button"
								tabIndex={0}
								className="result__link"
								onClick={handleShowFeedback}
							>
								{' '}
								Sign Up
							</span>
						</div>
					</div>
				</form>
			)}
		</div>
	);
};

export default OcSignupComponent;
