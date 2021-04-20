import * as React from 'react';
import BootstrapTooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger, { OverlayTriggerRenderProps } from 'react-bootstrap/OverlayTrigger';


type PositionProps = 'bottom' | 'top' | 'left' | 'right';

export interface TooltipProps {
	tooltip: React.ReactNode | React.ReactElement | ((props: OverlayTriggerRenderProps) => React.ReactNode);
	children: React.ReactElement | ((props: OverlayTriggerRenderProps) => React.ReactNode);
	/**
	 * The placement of the Overlay in relation to it's target.
	 * @default right
	 * */
	position?: PositionProps;
}


export const Tooltip: React.FC<TooltipProps> = props => {
	const {
		tooltip,
		children,
		position = 'right',
	} = props

	return (
		<OverlayTrigger
			placement={position}
			overlay={
				// FIXME: remove random id
				<BootstrapTooltip id={String(Math.random())}>{tooltip}</BootstrapTooltip>
			}
		>
			{children}
		</OverlayTrigger>
	)
};
