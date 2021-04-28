import * as React from 'react';


interface ListWrapperProps {
	style?: React.CSSProperties,
	className: string;
	children: React.ReactNode;
	'data-popper-escaped'?: boolean,
	'data-popper-placement'?: string,
	'data-popper-reference-hidden'?: boolean,
}

export const ListWrapper = React.forwardRef(
	(props: ListWrapperProps, ref: React.Ref<HTMLDivElement>) => {
		const {
			style,
			className,
			children,
			'data-popper-escaped': dataPopperEscaped,
			'data-popper-placement': dataPopperPlacement,
			'data-popper-reference-hidden': dataPopperReferenceHidden,
		} = props

		return (
			<div
				style={{
					...style,
					width: '100%',
				}}
				ref={ref}
				className={`select-component__dropdown ${className}`}
				aria-labelledby="dropdownManual"
				data-popper-escaped={dataPopperEscaped}
				data-popper-placement={dataPopperPlacement}
				data-popper-reference-hidden={dataPopperReferenceHidden}
			>
				{children}
			</div>
		);
	},
);
