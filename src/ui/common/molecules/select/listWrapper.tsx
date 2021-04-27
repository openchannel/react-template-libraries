import * as React from 'react';


interface ListWrapperProps {
	style?: React.CSSProperties,
	className: string;
	children: React.ReactNode;
}

export const ListWrapper = React.forwardRef(
	(props: ListWrapperProps, ref: React.Ref<HTMLDivElement>) => {
		const {
			style,
			className,
			children,
			...p
		} = props

		return (
			<div
				{...p}
				style={{
					...style,
					width: '100%',
				}}
				ref={ref}
				className={`select-component__dropdown ${className}`}
				aria-labelledby="dropdownManual"
			>
				{children}
			</div>
		);
	},
);
