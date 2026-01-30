
import {HeroSection} from './components.styled/index.styled'
import {useHomeMovieLoader} from '../hooks/useMoviesLoader'
import {useNavigate} from 'react-router'
import { useEffect, useState } from 'react'
import {PlayerDialogComponent} from './index.components'

export const HeroSectionComponent: React.FC =()=>{
    const [randomIndex, setRandomIndex] = useState<number>(0)
      const [movieYoutubeId, setMovieYoutubeId] = useState<number|null>(null)
    const [isPlay, setIsPlay] = useState<boolean>(false)
    const [fade, setFade] = useState<boolean>(true)
     const {tvAiringTodayTv} = useHomeMovieLoader()  // router data loader
     const {results}  =tvAiringTodayTv
     const navigate = useNavigate();

    //    handle redirect to movie details page and handle play
    function handleRedirectToMovieDetailsPageAndhandlePlay(e:React.MouseEvent<HTMLButtonElement>){
        e.preventDefault()
          console.log('hero>',e.currentTarget.dataset.movieid)
         
        const {dataset} = e.currentTarget
        if(dataset?.btn==='btn-for-movieDetails'){

            // passing state current 
           navigate('movie-details',{state:{movieId:dataset?.movieid}})
        }else if(dataset?.btn === 'btn-for-play'){
        //    navigate('video-play',{state:{movieId: dataset?.movieid}})
          if(dataset?.movieid){
                 setIsPlay((prev)=> !prev)
              console.log(results[randomIndex])
              setMovieYoutubeId(parseInt(dataset?.movieid))
          }else{
              console.log('movie id not getting..')
          }
           
        }
    }



    // random index picker within that range for slider effect (not slider)
    useEffect(()=>{
       if(Array.isArray(results)&&results.length>0){
       
         const interval = setInterval(()=>{
             setFade(false)
           const randomIndex = Math.floor((Math.random()*results.length))
        //    console.log(randomIndex)
           setRandomIndex(randomIndex)
           setFade(true)
        },3000)
        return ()=> clearInterval(interval)
       }
    },[])



    //  console.log(results[0]?.poster_path)
    //  console.log( `url(${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/original${(results[0]?.poster_path)})`)
    return(<>
        <div  style={{
            height: "100vh",
            maxWidth: "100%",
            backgroundImage: `url(${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/original${(results[randomIndex]?.poster_path)})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            backgroundSize: "cover"
        }}   className={`transition-all! duration-1000! ease-in-out! ${fade ? 'opacity-100!':  'opacity-0!'}`}>
            {/* dialog */}
                  {isPlay && <PlayerDialogComponent movieYoutubeId={movieYoutubeId}  setIsPlay={setIsPlay}   />}
            {/* dialog */}
             <HeroSection>
                <div className='desc-and-btn-div'>
                    <div className={`desc transition-all! duration-1000! ease-in-out! ${fade ? 'opacity-100!':  'opacity-0!'}`}>
                        {results[randomIndex]?.name}
                    </div>
                    <div className='btns-div cursor-pointer'>
                        <button onClick={handleRedirectToMovieDetailsPageAndhandlePlay}  data-movieid={results[randomIndex]?.id}   className='btn-1'  data-btn='btn-for-play'>
                             <img src="play_icon.png" alt="img" width="28px"/>
                            <span style={{
                                fontWeight: 'bolder',
                                paddingLeft: '0.9rem',
                                cursor: "pointer"
                            }}
                            >Play</span>
                        </button>
                        <button  onClick={handleRedirectToMovieDetailsPageAndhandlePlay} data-movieid={results[randomIndex]?.id}  data-btn='btn-for-movieDetails'  className='btn-2
                         flex items-center justify-center 
                        bg-stone-50/10
                        text-amber-50
                        cursor-pointer
                        '
                        >
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 0 1 .67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 1 1-.671-1.34l.041-.022ZM12 9a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
</svg>

                           <span style={{
                               fontWeight: "bolder",
                               textAlign: "center",
                               paddingLeft: "0.3rem"
                           }}>
                              More info
                           </span>
                        </button>
                    </div>
                </div>  
             </HeroSection>
        </div>
    </>)
}