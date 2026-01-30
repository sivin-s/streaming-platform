import { useContext } from "react"
import {AuthCreateContext} from  '../context/auth/AuthCreateContext'
import type  {AuthContextType} from '../types/AuthContextType'


export const useAuthContext = ():AuthContextType =>{
      const userAuth = useContext(AuthCreateContext)
      if(userAuth === undefined){
         throw new Error('missing context values')
      }
      return {user:userAuth.user,setUser: userAuth.setUser,isLoading:userAuth.isLoading,setIsLoading: userAuth.setIsLoading};
}