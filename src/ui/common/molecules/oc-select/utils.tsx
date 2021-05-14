import { Option } from './index';


export const transformToValidOptions = (array: Array<Option|string>, key = 'value'): Option[] => (
	array.reduce((acc, item) => {
		if (typeof item === 'object' && key !== 'value') {
			acc.push({ [key]: Object.values(item)[0] })

		} else if (typeof item === 'object') {
			acc.push(item)

		} else {
			acc.push({ [key]: item })
		}
		return acc
	}, [] as Option[])
)
