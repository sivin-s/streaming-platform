import type {UserType} from './UserType'

interface AuthContextType{  // this is for store data {} in useState()
    user: UserType | null;    // state (user)
    setUser (user: UserType | null): void    // setState (SetUser)
    isLoading: boolean;
    setIsLoading (p:boolean): void;
}

export type {
    AuthContextType
}