export const isDev = (): boolean => process.env.NODE_ENV === 'development';

export const isStorybook = (): boolean => process.env.STORYBOOK === 'true';
