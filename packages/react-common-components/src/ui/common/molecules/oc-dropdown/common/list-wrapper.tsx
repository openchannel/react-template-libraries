import * as React from 'react';

import { ListWrapperProps } from '../types';

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
		} = props;

		const classByVariant =
			variant === 'inline' ? 'dropdown-label__dropdown' : 'dropdown-button__menu';

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
