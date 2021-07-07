import type { PropsWithChildren } from 'react';
import get from 'lodash/get';
import isEqual from 'lodash/isEqual';
import isString from 'lodash/isString';

export type CheckFn<P> = (prevProps: P, nextProps: P) => boolean;

const addictedGet = (object: Record<string, any>, key: string, defaultValue: any = null) =>
	get(object, `form.${key}[${object.field.name}]`, defaultValue);

const checkIsEqualByKey = <P>(
	prevProps: Readonly<PropsWithChildren<P>>,
	nextProps: Readonly<PropsWithChildren<P>>,
) => (key: string) => isEqual(get(prevProps, key), get(nextProps, key));

export const shouldFieldGroupUpdate = <P>(
	prevProps: Readonly<PropsWithChildren<P>>,
	nextProps: Readonly<PropsWithChildren<P>>,
) => ['error', 'children', 'name'].every(checkIsEqualByKey<P>(prevProps, nextProps));

export const shouldFieldUpdate = <P>(
	check: Array<CheckFn<P> | string> = [],
	checkValue: CheckFn<P> | string = 'field.value',
) => (
	prevProps: Readonly<PropsWithChildren<P>>,
	nextProps: Readonly<PropsWithChildren<P>>,
): boolean => {
	const defaultChecks = [
		'field.name',
		checkValue,
		(prevP: P, nextP: P) =>
			isEqual(addictedGet(prevP, 'touched', false), addictedGet(nextP, 'touched', false)) &&
			isEqual(addictedGet(prevP, 'errors', []), addictedGet(nextP, 'errors', [])),
		...check,
	];

	return defaultChecks.every((check) =>
		isString(check)
			? checkIsEqualByKey<P>(prevProps, nextProps)(check)
			: check(prevProps, nextProps),
	);
};
