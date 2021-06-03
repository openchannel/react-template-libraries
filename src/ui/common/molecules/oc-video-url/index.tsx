//commit 91e34d420898eff90181614319cb86372907fafc Author: Alex Tkachenko Date: 08.10.20, 11:46
import * as React from 'react';
import { OcVideoComponent, OcInputComponent, VideoProps, InputProps } from '../../index';
import './style.scss';

export interface VideoUrlProps extends VideoProps, InputProps {
	/**
	 * initial input value
	 */
	videoUrl: string;
	/**
	 * value - useState input value
	 */
	value: string;
	/**
	 * Change handler for input
	 */
	onChange?: any;
	/**
	 * withoutPreview - boolean value, if you don't want preview video
	 */
	withoutPreview: boolean;
}
export const validateURL = (str: string) => {
	const pattern = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm;
	return pattern.test(str);
};

export const OcVideoUrlComponent: React.FC<VideoUrlProps> = (props) => {
	const { disabled, placeholder, customClass, onChange, withoutPreview, value } = props;
	const handleChange = React.useCallback(
		(e: any) => {
			onChange(e.target.value);
		},
		[onChange],
	);

	return (
		<>
			<OcInputComponent
				inputType="text"
				disabled={disabled}
				placeholder={placeholder}
				value={value}
				onChange={handleChange}
				className={`form-control ${customClass}`}
			/>
			{!withoutPreview && validateURL(value) && (
				<OcVideoComponent customClass="video-url__reference" videoUrl={value} />
			)}
		</>
	);
};
