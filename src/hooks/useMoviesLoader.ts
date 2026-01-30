import {useLoaderData} from 'react-router'
import type {HomeLoaderType} from '../types/HomeLoaderType' 


// useLoaderData returns unknown 
export const useHomeMovieLoader = ()=>{
   return useLoaderData<HomeLoaderType>();  
}