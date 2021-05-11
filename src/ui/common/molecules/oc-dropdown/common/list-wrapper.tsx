import * as React from 'react';

import { DropdownVariants } from '../base-dropdown';


export interface ListWrapperProps {
	alignRight?: boolean;
	variant: DropdownVariants;
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
			variant,
			style,
			className,
			children,
			'x-placement': xPlacement,
			'data-popper-escaped': dataPopperEscaped,
			'data-popper-placement': dataPopperPlacement,
			'data-popper-reference-hidden': dataPopperReferenceHidden,
		} = props

		const classByVariant = variant === 'inline' ? 'dropdown-label__dropdown' : 'dropdown-button__menu'

		return (
			<div
				style={style}
				ref={ref}
				aria-labelledby="dropdownMenu"
				className={`${classByVariant} ${className}`}
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
