import DOMPurify from 'dompurify';

export const stripHtmlTags = (string = ''): string => {
	return string.replace(/(<([^>]+)>)/gi, '');
};

export const sanitizeHtml = (dirty: string) => DOMPurify.sanitize(dirty);
