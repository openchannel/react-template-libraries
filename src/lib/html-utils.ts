export const stripHtmlTags = (string = ''): string => {
	return string.replace(/(<([^>]+)>)/gi, "")
}
