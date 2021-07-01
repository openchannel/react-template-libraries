import DOMPurify from 'dompurify';

export const stripHtmlTags = (string = ''): string => {
	return string.replace(/(<([^>]+)>)/gi, '');
};

export const sanitizeHtml = (dirty: string) => DOMPurify.sanitize(dirty);

export const titleCase = (string: string) =>
	string
		.split(' ')
		.map((word) => word[0].toUpperCase() + word.slice(1).toLowerCase())
		.join(' ');
