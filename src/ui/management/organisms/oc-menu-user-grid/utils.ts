export const userInitials = (userName: string): string =>
	userName
		? userName
				.split(' ')
				.map((value) => value.substring(0, 1))
				.join('')
				.substring(0, 2)
		: '';
