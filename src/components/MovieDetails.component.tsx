import React, {useEffect, useState } from 'react'
import {CardSection,Card,MovieDetails} from './components.styled/index.styled'
import {FallBack404Component,PlayerDialogComponent} from './index.components'
import {LoadingComponent} from './Loading.component'
import {  useLocation, useNavigate } from 'react-router';
import type {MovieDetailsApiResType} from '../types/MovieDetailsType'
import type  {RelatedMovieDataApiResponseType} from '../types/RelatedMovieType'
import {addMovieToWatchList} from '../services/watchList.service'
import { toast } from 'react-toastify';


interface TimeDetails{
  hours: string;
  minutes: string;
}

export const MovieDetailsComponent = ()=>{
  const navigate = useNavigate()
  const [fetchData, setFetchData] = useState<MovieDetailsApiResType | null>(null)
  const [relatedMovie, setRelatedMovie] = useState<RelatedMovieDataApiResponseType | null>(null)
  const [calculatedTimeState, setCalculatedTimeState] = useState<TimeDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [fetchResourceNotFound,setFetchResourceNotFound] = useState<boolean>(false)
  const [isPlay, setIsPlay] = useState<boolean>(false)
  const [movieYoutubeId, setMovieYoutubeId] = useState<number|null>(null)

     const {state} = useLocation()


       const [watchListAddedMessageState, setWatchListAddedMessageState] = useState<{
         status: boolean;
         message: string;
       } | null>(null);   // after watch list message & status ;



     
       // handle adding watch list db
       const handleWatchList = (e: React.MouseEvent<SVGElement>) => {
        //  console.log(e.currentTarget instanceof );
         console.log('e',e.target)
  
           const datatype = e.currentTarget.dataset;
           // console.log('p>>',datatype.movieId)
           // console.log(data)
     
           // find the movie using id
     
           addMovieToWatchList({
             dataObj: {
               id: fetchData?.id | null,
               backdrop_path: fetchData?.backdrop_path || null,
               title: fetchData?.title || null
          
               //    release_date:
               // or
               // first_air_date:
             },
             setWatchListAddedMessageState,
           });
           // console.log(findedData)
     
           console.log("i>>>>", watchListAddedMessageState);
                   if(watchListAddedMessageState?.status){
                       toast(watchListAddedMessageState?.message,{
                       type: 'success',
                        position: "top-right",
           autoClose: 2000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: false,
           draggable: true,
           progress: undefined,
           theme: "dark"})
                   }else if(!watchListAddedMessageState?.status){
                              toast(watchListAddedMessageState?.message,{
                       type: 'error',
                        position: "top-right",
           autoClose: 2000,
           hideProgressBar: false,
           closeOnClick: true,
           pauseOnHover: false,
           draggable: true,
           progress: undefined,
           theme: "dark"})
     
           //end if
         }
     }



    //  console.log('p>', state)

    //   handle related  movie data
    async function handleRelatedMovieData(){
      try {
          setIsLoading(true)
            const res  = await fetch(`${import.meta.env.VITE_TMDB_API_URL}/movie/${state.movieId}/recommendations?language=en-US&page=1&api_key=${import.meta.env.VITE_TMDB_KEY}`)
           
        const data  = await res.json()
          console.log('i>>',data)
          // TODO: i couldn't add server data not found validate
          // with data and without data it return as {} inside fields are distinct.
          // without data {} inside object contain 'success:false'
          // without data {} inside object doesn't contain  'success:false'
        setRelatedMovie(data)

      } catch (error) {
         console.log(error)
      }finally{
        setIsLoading(false)
      }
    }

    const handlePlayingMovie = (e:React.MouseEvent<SVGElement>)=>{
      // trailer 
      e.preventDefault()
       console.log("video clicked!!")
       const data = fetchData?.id
       if(data){
          setIsPlay((prev)=> !prev)
          setMovieYoutubeId(data)
          // console.log('movie id >>>>##',data)
          // console.log('movie id >>>>##',movieYoutubeId)
       }
    }

    function handleRelatedDataFetch(e:React.MouseEvent<HTMLDivElement>):void{
      const id = e.currentTarget.dataset?.movieid
      console.log('o>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>#',id)
      // console.log('p>>',state)
      // if(id===''){
      //   state.movieId= id
      // }
       navigate('/movie-details',{state:{movieId: id},replace: true})
      //  console.log("clicked")
    }

    // handle fetch data 
     async function handleFetchData(){
      try {
        setIsLoading(true)
             const res = await fetch(`${import.meta.env.VITE_TMDB_API_URL}/movie/${state?.movieId}?language=en-US&api_key=${import.meta.env.VITE_TMDB_KEY}`)
             const data = await res.json()
             setFetchData(data)
            //  console.log(data)
      } catch (err) {
        //  console.log(err,{cause:})
         console.error(err)
      }finally{
        setTimeout(()=>{
             setIsLoading(false)
        },2000)
      }
     }



     useEffect(()=>{   // data fetching initial time and react router state change.
            handleFetchData()
            handleRelatedMovieData()
     },[state])

     // fallback  if fetch data is null
     useEffect(()=>{
         console.log('o>',fetchData)
         console.log('o>',fetchData?.success)
         if(fetchData?.success === false){
            setFetchResourceNotFound(true)
         }else{
           setFetchResourceNotFound(false)
         }
     },[fetchData])

     useEffect(()=>{   // redirect to home page - fetch reso not found.
         if(fetchResourceNotFound){
           setTimeout(()=>{
                 navigate('/',{replace: true})
           },2000)
         }
     },[fetchResourceNotFound])

      //   convert   "runtime": 129 to '2 hours and 9 minutes'
     const  TimeDisplay= (runtime:number):TimeDetails=>{
           const hour:string = (Math.floor((runtime/60))).toString()
           const minute:string = (runtime%60).toString()
            return {hours: hour,minutes: minute}
     }
  // "runtime": 129,
//  console.log(new Date(fetchData?.release_date).getFullYear())
     useEffect(()=>{
       const calculatedTime =  TimeDisplay(fetchData?.runtime as number)
       setCalculatedTimeState(calculatedTime)
      //  console.log('o>',calculatedTime)
    },[fetchData])

    return(
 (isLoading )  ?  <LoadingComponent/>  : (
          (fetchResourceNotFound !== true ) ?  (
             
             <div  className='h-screen max-w-full flex items-center justify-center bg-[hsl(72,_14%,_7%)]'>
                {/* dialog start */}
              {(isPlay  &&  movieYoutubeId ) && <PlayerDialogComponent setIsPlay={setIsPlay}  movieYoutubeId={movieYoutubeId}  />}
             {/* dialog end */}
         <MovieDetails >
              <div className='poster-div group focus:outline-none  relative bg-[hsl(72, 14%, 7%)]  h-full w-[40%] rounded-tl-2xl rounded-bl-2xl'>
                <img className='h-full  rounded-tl-2xl rounded-bl-2xl max-w-full object-cover'  src={`${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/original${(fetchData?.backdrop_path)?fetchData?.backdrop_path:fetchData?.poster_path}&api_key${import.meta.env.VITE_TMDB_KEY}`} alt="poster" />
                {/* poster */}
  <div className="absolute inset-0 z-50 focus:outline-none   rounded-tl-2xl rounded-bl-2xl  cursor-pointer   bg-[hsla(72,14%,7%,0.3)] backdrop-blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
    {/* play btn click */}
                     <svg onClick={handlePlayingMovie}  className='w-[5.5rem]' xmlns="http://www.w3.org/2000/svg" fill="#fff" viewBox="0 0 24 24"  >
  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
</svg>

                </div>
              </div>
              <div className='p-4!  details-div h-full  bg-[hsl(72,_14%,_7%)] w-[60%]' style={{color: "aliceblue"}}>
                 <div className='title-rating-div  flex h-[5.1rem] max-w-full'>
                    <div className='h-[5rem]  w-[80%]'>
                     
                          <h1 className='text-4xl font-medium'>
                          {fetchData?.title || "N/A"}
                         </h1>
                   
                     
                        <ul className=' flex text-center  w-full h-6'  style={{marginTop:'0.4rem'}}>
                            <li className='border-1 w-[3.5rem]  border-l-0  border-b-0 border-t-0'>{(fetchData?.release_date && new Date(fetchData?.release_date).getFullYear()) || "N/A"}</li>
                             {/*time*/}
                            <li className='border-1 w-[5rem]  border-l-0 border-b-0 border-t-0'>{calculatedTimeState?.hours || "N/A"}h {calculatedTimeState?.minutes || "N/A"}m</li>
                            <li className='border-1 w-[3.5rem] border-r-0 border-l-0 border-b-0 border-t-0'>{(fetchData?.adult ? +18 : 'U')||"N/A"}</li>
                        </ul>
                    
                    </div>
                    <h1 className='w-[20%] flex items-center justify-center text-2xl font-bold'>
                       {fetchData?.vote_average && Math.floor(fetchData?.vote_average)}
                        {/*star icon*/}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FEEC37" className="size-6">
  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
</svg>

                    </h1>
                 </div>
                 <div className='overview-div
                 h-[16.2rem]
                 relative
                 '>  
                   {/* watch list */}
                      <button
                      
                       
                      className='
                         absolute
                         ml-[31.5rem]!
                         mt-1!
                         cursor-pointer
                         
                      '>

                          <svg   data-movieid={fetchData?.id}    onClick={handleWatchList}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-9 hover:fill-[#e50913] transition-colors">
  <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
</svg>

                      </button>
                       <h1 className='
                       h-[2.3rem] text-[1.3rem]
                      font-bold
                      mt-7!
                    '>Overview</h1>
                    
                    <hr className='w-[6.5rem] border-0 h-[0.3rem] bg-red-600 mb-[0.9rem]!'/>
                    <div className='overview
                      w-full
                      h-[11.3rem]
                     
                    '>
                      <div className={`overview-text-div `}>
                        {/*over view*/}
                        {(fetchData && fetchData?.overview )|| "N/A"}
                      </div>
                      <div className='genre-div w-full h-[5rem]'>
                            <ul className='font-medium '>
                                <li className='mt-4!'>
                                    <span>{`Created by : ${(fetchData?.production_companies  && fetchData?.production_companies[0]?.name)||"N/A"}`}</span>
                                    {/*created by*/}
                                </li>
                                <li className='mt-1!'>
                                    <span>{`Genre: ${fetchData?.genres &&  fetchData?.genres?.map((cu)=> cu?.name)}`}</span>
                                    {/*genre*/}
                                </li>
                                   <li className='mt-1!'>
                                    <span>{`popularity: ${fetchData?.popularity && fetchData?.popularity.toFixed(1)|| "N/A"}`}</span>
                                    {/*genre*/}
                                </li>
                            </ul>
                      </div>
                    </div>
                 </div>
                 <div className='relatedMovie-div  h-[18rem] w-full'>
                   
                    <h1 className=' h-8 mt-4! text-[1.3rem] font-bold'>Related Movies :</h1>
                    <div className=' h-59 w-full'>
                        {/*card*/}
                        <CardSection className='no-scrollbar scroll-smooth  flex overflow-x-scroll gap-5'>
                         {
                          relatedMovie && relatedMovie?.results?.map((cu)=>(
                                //  onClick={()=> navigate('media-details',{state:{movieId: fetchData?.id},replace: true})}
                                <Card className='mt-4!' data-title={cu?.title} onClick={handleRelatedDataFetch} data-movieid={cu?.id}>
                                <img className='object-cover h-full max-w-full' key={cu.id}  src={`${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/w500${cu?.backdrop_path}`} alt="img" />
                                 </Card>
                            ))
                         }
                        </CardSection>
                    </div>
                 </div>
              </div>
         </MovieDetails>
        </div>
          ) : ( <FallBack404Component/>)
      )
    )
}

