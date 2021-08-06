import fetchIntercept from 'fetch-intercept';

export const fetchInterceptor = fetchIntercept.register;

export const removeFetchInterceptor = fetchIntercept.clear;
