import { useEffect, useState } from "react"
import { WatchListStatusCreateContext } from "../context/WatchListStatusContext"
import { getMovieWatchListCollection } from "../services/watchList.service"



export const WatchListStateStatusProvider:React.FC<React.PropsWithChildren>  = ({children})=>{

 const [watchListMovieIdStatus, setWatchListMovieIdStatus] = useState<Array<number>>([])

 const handleWatchListIdsCollections = async ()=>{
     const data  =  await  getMovieWatchListCollection()
        // console.log(querySnapshot.docs.map(doc => doc.data()))
          const watchListMovieIds = data?.map((doc)=>{ // data extraction
              return  {...doc.data()}
          })

          if(Array.isArray(watchListMovieIds) && watchListMovieIds.length > 0){
            const collectionOfWatchListId = watchListMovieIds?.map((doc)=>(doc.id))
            // console.log('k>',collectionOfWatchListId)
            setWatchListMovieIdStatus(collectionOfWatchListId)
          }

    //  if(watchListMovieIds && watchListMovieIds.length > 0){
    //      setWatchListMovieIdStatus(watchListMovieIds)
    //  }

//   console.log(data)
 }

 useEffect(()=>{
      handleWatchListIdsCollections()
 },[])


  return(
      <WatchListStatusCreateContext.Provider value={watchListMovieIdStatus}>
        {children}
    </WatchListStatusCreateContext.Provider>
  )
}