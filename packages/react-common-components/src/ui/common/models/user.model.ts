export interface User {
    userId: string;
    name: string;
    email: string;
    customData: any;
    created: number;
    type?: string;
    roles?: string[];
    permissions?: string[];
}
export interface UserDetails {
    email: string;
    exp: number;
    firstName: string;
    generatedByOrigin: string;
    lastName: string;
    organizationId: string;
    roles: string[];
    permissions?: string[];
    userExternalId: string;
    isSSO: boolean;
}
export interface UserAccount extends User {
    userAccountId: string;
}
export interface UserAccountGridModel extends UserAccount {
    inviteStatus?: UserAccountInviteStatusTypeModel;
    inviteId?: string;
    inviteToken?: string;
}
export interface UserGridActionModel {
    action: UserGridOptionTypeModel;
    userId: string;
    userAccountId?: string;
    inviteId?: string;
    inviteToken?: string;
}
export declare type UserGridOptionTypeModel = 'EDIT' | 'DELETE';
export declare type UserAccountInviteStatusTypeModel = 'ACTIVE' | 'INVITED';
export declare enum AccessLevel {
    ALL = "*",
    READ = "READ",
    MODIFY = "MODIFY",
    DELETE = "DELETE"
}
export declare enum PermissionType {
    ALL = "*",
    APPS = "APPS",
    ACCOUNTS = "ACCOUNTS",
    DEVELOPERS = "DEVELOPERS",
    USERS = "USERS",
    FILES = "FILES",
    FORMS = "FORMS",
    OWNERSHIPS = "OWNERSHIPS",
    REVIEWS = "REVIEWS",
    ORGANIZATIONS = "ORGANIZATIONS"
}
export interface Permission {
    type: PermissionType;
    access: AccessLevel[];
}
