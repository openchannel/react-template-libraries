//commit 91e34d420898eff90181614319cb86372907fafc Author: Alex Tkachenko Date: 08.10.20, 11:46
import * as React from 'react';
import { OcVideoComponent, OcInputComponent, VideoProps, InputProps } from '../../index';
import './style.scss';

export interface VideoUrlProps extends VideoProps, InputProps {
	/**
	 * Change handler for input
	 */
	onChange: React.ChangeEventHandler<HTMLInputElement>;
	/**
	 * withoutPreview - boolean value, if you don't want preview video
	 */
	withoutPreview: boolean;
}

export const OcVideoUrlComponent: React.FC<VideoUrlProps> = (props) => {
	const { disabled, placeholder, customClass, videoUrl, withoutPreview } = props;
	const [value, onChange] = React.useState(videoUrl);

	return (
		<>
			<OcInputComponent
				inputType="text"
				disabled={disabled}
				placeholder={placeholder}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				className={`form-control ${customClass}`}
			/>
			{!withoutPreview && <OcVideoComponent customClass="video-url__reference" videoUrl={value} />}
		</>
	);
};
