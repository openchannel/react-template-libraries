import * as React from 'react';

import { DropdownVariants } from './index';


export interface ListWrapperProps {
	alignRight?: boolean;
	type: DropdownVariants;
	style?: React.CSSProperties;
	className: string;
	children: React.ReactNode;
	'x-placement'?: string;
	'data-popper-escaped'?: boolean;
	'data-popper-placement'?: string;
	'data-popper-reference-hidden'?: boolean;
}

export const ListWrapper = React.forwardRef(
	(props: ListWrapperProps, ref: React.Ref<HTMLDivElement>) => {
		const {
			type,
			style,
			className,
			children,
			'x-placement': xPlacement,
			'data-popper-escaped': dataPopperEscaped,
			'data-popper-placement': dataPopperPlacement,
			'data-popper-reference-hidden': dataPopperReferenceHidden,
		} = props

		const classByType = type === 'inline' ? 'dropdown-label__dropdown' : 'dropdown-button__menu'

		return (
			<div
				style={style}
				ref={ref}
				aria-labelledby="dropdownMenu"
				className={`${classByType} ${className}`}
				x-placement={xPlacement}
				data-popper-escaped={dataPopperEscaped}
				data-popper-placement={dataPopperPlacement}
				data-popper-reference-hidden={dataPopperReferenceHidden}
			>
				{children}
			</div>
		);
	},
);
