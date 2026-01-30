interface UserType{
    uid: string;
    email?: string | null;
    authToken?: string;
    displayName?: string | null;
    photoURL?: string | null;
}

export type {
    UserType
}