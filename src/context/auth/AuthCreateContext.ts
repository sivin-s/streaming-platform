import { createContext } from "react";
import type {AuthContextType} from '../../types/AuthContextType'

// it store authData , setAuthData() (AuthContextType contains state, setState)
export const AuthCreateContext = createContext<AuthContextType | undefined>(undefined)

