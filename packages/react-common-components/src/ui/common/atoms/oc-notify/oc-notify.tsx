import * as React from 'react';
import { toast, ToastContainer } from 'react-toastify';

import { ReactComponent as ToastErrorIcon } from '../../../../assets/img/toast-error.svg';
import { ReactComponent as ToastInfoIcon } from '../../../../assets/img/toast-info.svg';
import { ReactComponent as ToastSuccessIcon } from '../../../../assets/img/toast-success.svg';
import { ReactComponent as ToastWarnIcon } from '../../../../assets/img/toast-warning.svg';

import './react-tostify.scss';
import './style.scss';

interface INotifyMessage {
	message: string;
	icon: string;
}

interface IIcon {
	[key: string]: JSX.Element;
}

const options = {
	autoClose: 3000,
};

export const notify = {
	error: (message: string) => toast.error(<Msg message={message} icon="error" />, options),
	success: (message: string) => toast.success(<Msg message={message} icon="success" />, options),
	warning: (message: string) => toast.warning(<Msg message={message} icon="warn" />, options),
	info: (message: string) => toast.info(<Msg message={message} icon="info" />, options),
};

const icons: IIcon = {
	error: <ToastErrorIcon />,
	success: <ToastSuccessIcon />,
	warn: <ToastWarnIcon />,
	info: <ToastInfoIcon />,
};

const Msg = ({ message, icon }: INotifyMessage) => (
	<div className="rc-toast-presentation">
		{icons[icon]}
		<div className="rc-toast-message">{message}</div>
	</div>
);

export const OcNotificationContainer = () => {
	return (
		<ToastContainer
			position="top-right"
			hideProgressBar
			autoClose={5000}
			closeButton={false}
			newestOnTop={false}
			rtl={false}
			pauseOnFocusLoss
			draggable
		/>
	);
};
