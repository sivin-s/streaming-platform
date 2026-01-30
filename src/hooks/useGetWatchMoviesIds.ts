import { useContext } from "react"
import {WatchListStatusCreateContext} from '../context/WatchListStatusContext'

export const useGetWatchListMoviesIds = ():Array<number>=>{
    const ids = useContext(WatchListStatusCreateContext)
    if(ids === undefined){
            throw new Error('missing context values')
    }
    return ids
}