const letterRegex = /[a-zA-Z]/;

export const createNameInitials = (name: string, characterLimit: number): string =>
	name && characterLimit > 0
		? name
				.split(' ')
				.map((part) => part[0])
				.filter((charValue) => letterRegex.test(charValue))
				.join('')
				.substring(0, characterLimit)
				.toUpperCase()
		: '';
