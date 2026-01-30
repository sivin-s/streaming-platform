import { useEffect } from 'react'
import {MovieDetailsComponent} from '../components/index.components'
import  {useLocation, useNavigate} from 'react-router'

export const MovieDetailsPage = ()=>{
    const navigate = useNavigate()
    const {state} = useLocation()
    const movieId:(string|null) = state?.movieId
    useEffect(()=>{
     
        if(!movieId){
              navigate('/',{replace: true})
        }
    },[])
    //  console.error(state)
    if(!movieId) return null
    return(<>
       <MovieDetailsComponent/>
    </>)
}