import axios, { AxiosError, AxiosResponse } from 'axios';

const interceptors = axios.interceptors;
const requestInterceptor = axios.interceptors.request;
const responseInterceptor = axios.interceptors.response;

type InterceptorResponse = AxiosResponse;
type InterceptorError = AxiosError;

export {
	InterceptorError,
	InterceptorResponse,
	interceptors,
	requestInterceptor,
	responseInterceptor,
};
