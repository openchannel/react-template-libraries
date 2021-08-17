import * as React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { ToastContainer } from 'react-toastify';

import ToastErrorIcon from '../../../../assets/img/toast-error.svg';
import ToastWarnIcon from '../../../../assets/img/toast-warning.svg';
import ToastInfoIcon from '../../../../assets/img/toast-info.svg';
import ToastSuccessIcon from '../../../../assets/img/toast-success.svg';
import './style.scss';

interface INotifyMessage {
	message: string;
	icon: string;
}

interface IIcon {
	[key: string]: JSX.Element;
}

export const notify = {
	error: (message: string) => toast.error(<Msg message={message} icon="error" />),
	success: (message: string) => toast.success(<Msg message={message} icon="success" />),
	warning: (message: string) => toast.warning(<Msg message={message} icon="warn" />),
	info: (message: string) => toast.info(<Msg message={message} icon="info" />),
};

const icons: IIcon = {
	error: <ToastErrorIcon />,
	success: <ToastSuccessIcon />,
	warn: <ToastWarnIcon />,
	info: <ToastInfoIcon />,
};

const Msg = ({ message, icon }: INotifyMessage) => {
	return (
		<div className="rc-toast-presentation">
			{icons[icon]}
			<div className="rc-toast-message">{message}</div>
		</div>
	);
};

export const OcNotificationContainer = () => {
	return (
		<ToastContainer
			position="top-right"
			hideProgressBar
			autoClose={5000}
			closeButton={false}
			newestOnTop={false}
			closeOnClick={true}
			rtl={false}
			pauseOnFocusLoss
			draggable
		/>
	);
};