import * as React from 'react';
import OverlayTrigger, { OverlayTriggerRenderProps } from 'react-bootstrap/OverlayTrigger';
import BootstrapTooltip from 'react-bootstrap/Tooltip';
import { nanoid } from 'nanoid';

type PositionProps = 'bottom' | 'top' | 'left' | 'right';

export interface TooltipProps {
	tooltip:
		| React.ReactNode
		| React.ReactElement
		| ((props: OverlayTriggerRenderProps) => React.ReactNode);
	children: React.ReactElement | ((props: OverlayTriggerRenderProps) => React.ReactNode);
	/**
	 * The placement of the Overlay in relation to it's target.
	 * @default right
	 * */
	position?: PositionProps;
}

const OcTooltipComponent: React.FC<TooltipProps> = (props) => {
	const { tooltip, children, position = 'right' } = props;

	const uniqId = React.useRef(nanoid());

	return (
		<OverlayTrigger
			placement={position}
			overlay={<BootstrapTooltip id={uniqId.current}>{tooltip}</BootstrapTooltip>}
		>
			{children}
		</OverlayTrigger>
	);
};

export default OcTooltipComponent;
