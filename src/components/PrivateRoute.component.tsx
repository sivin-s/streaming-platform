import { Outlet, Navigate } from 'react-router'
import {useAuthContext} from '../hooks/useAuthContext'
import {LoadingComponent} from './Loading.component'

export const  PrivateRouteComponent =()=>{   // private routes guard - cm
    const {user,isLoading}  = useAuthContext()

    if(isLoading){
        return(
            <LoadingComponent/>
        )
    }

    if(user===null){
       return (
          <Navigate to='/login-and-sign' replace={true}/>
       )
    }

    return (
        <Outlet/> // children render
    )
}