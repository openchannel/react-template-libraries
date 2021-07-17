export interface LoginRequest {
	idToken: string;
	accessToken: string;
}

export interface LoginResponse {
	refreshToken: string;
	accessToken: string;
}

export interface RefreshTokenRequest {
	refreshToken: string;
}

export interface SignUpByInviteRequest {
	inviteToken: string;
	userCustomData: any;
}
