




import React, {useState, useEffect } from 'react'
import {PlayerDialog} from './components.styled/index.styled'
import {PlayerComponent} from './Player.component'
import type {MovieTrailerApiResponse} from '../types/MovieTrailerType'



interface PlayerDialogProps{
    movieYoutubeId : number | null;
    setIsPlay(fn:(prev: boolean)=> boolean): void;
}

export const PlayerDialogComponent:React.FC<React.PropsWithChildren<PlayerDialogProps>> =({movieYoutubeId,setIsPlay})=>{

      const [trailerDetails, setTrailerDetails] = useState<MovieTrailerApiResponse|null>(null)
      const [youTubeWatchKey, setYoutubeWatchKey] = useState<string>('')
      const [isOpen, setIsOpen]  = useState<boolean>(true)
      
       // fetch trailer
    async function handleFetchTrailerData(movieYoutubeId: (number|null)){
        if(typeof movieYoutubeId === "number"){
                 const res = await fetch(`${import.meta.env.VITE_TMDB_API_URL}/movie/${movieYoutubeId}/videos?language=en-US&api_key=${import.meta.env.VITE_TMDB_KEY}`)
          const data = await res.json()
          setTrailerDetails(data)  // data insert async way because it is in async function that why ?  
          console.log('d>',data)
        }
    }


    //  handle modal and overlay bg
    const handleModelAndOverlay =  (e:React.MouseEvent<HTMLButtonElement>)=>{
         e.preventDefault()
        setIsOpen((prev)=> !prev)
        setIsPlay((prev)=> !prev) 
       }


   
    useEffect(()=>{  //fetch trailer data
         handleFetchTrailerData(movieYoutubeId)
    },[])

    useEffect(()=>{  // monitor the id. Because the trailerDetails state updates async
         setYoutubeWatchKey(trailerDetails?.results[0]?.key)
    },[trailerDetails])
   
    return(<div
      style={{
      
        width: "100%",
        height: "100vh",
          position: "absolute",
    inset: '0',
    zIndex: '600',
    backgroundColor: 'hsla(72, 14%, 7%,0.6)',
    display: 'flex',
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center"
      }}
    >
     <div
       style={{
       
        width: "50rem",
        height: "32.8rem",
        margin: "0 auto",
        //  backgroundColor: 'hsla(72, 14%, 7%,0.6)',
         display: "flex",
         alignItems: "center",
         justifyContent: "center",
         flexDirection: "column",
       }}
     >

        {/* dialog */}
     <div className=' w-full h-full  relative'>
         
         <PlayerDialog open={isOpen}>
       <PlayerComponent url={`${import.meta.env.VITE_YOUTUBE_LINK}=${youTubeWatchKey}`}/>
    </PlayerDialog>
    {/* close dialog */}
     </div>
    {/* close dialog */}
        <div  className=' w-full h-[2.4rem] flex justify-end'>
             <button className='text-7xl cursor-pointer'
              onClick={handleModelAndOverlay}
             >
            <svg  style={{color: "aliceblue"}}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-10">
  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
</svg>
         </button>
        </div>
     </div>
    </div>)
}














