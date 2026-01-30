import type {OnTheAirApiResponseType} from '../types/OnTheAirTvType'
import type {TrendingAllTvApiResponseType} from '../types/TrendingAllTvType'
import type {TrendingMovieApiResponseType} from '../types/TrendingMovieType'
import type {TreadingTvApiResponseType} from '../types/TrendingTvType'
import type {AiringTodayTvApiResponseType} from '../types/TvAiringTodayTvType'

export const homeLoader = async ():Promise<{
  trendingMovie: TrendingMovieApiResponseType;
  trendingAllTv: TrendingAllTvApiResponseType;
  trendingTv: TreadingTvApiResponseType;
  tvAiringTodayTv: AiringTodayTvApiResponseType;
  onTheAirTv  : OnTheAirApiResponseType;
}>=>{
  // console.log("hello")
  try {
   // fetching
      const [trendingMovieRes, trendingAllTvRes, trendingTvRes, tvAiringTodayTvRes, onTheAirTvRes ] = await Promise.all([
    fetch(`${import.meta.env.VITE_TMDB_API_URL}/trending/movie/day?language=en-US&api_key=${import.meta.env.VITE_TMDB_KEY}`), /* trending movie  */
    fetch(`${import.meta.env.VITE_TMDB_API_URL}/trending/all/day?language=en-US&api_key=${import.meta.env.VITE_TMDB_KEY}`),  /*  trending All */
    fetch(`${import.meta.env.VITE_TMDB_API_URL}/trending/tv/day?language=en-US&api_key=${import.meta.env.VITE_TMDB_KEY}`),  /* trending tv */
    fetch(`${import.meta.env.VITE_TMDB_API_URL}/tv/airing_today?language=en-US&page=1&api_key=${import.meta.env.VITE_TMDB_KEY}`), /* tv- airing_today */
    fetch(`${import.meta.env.VITE_TMDB_API_URL}/tv/on_the_air?language=en-US&page=1&api_key=${import.meta.env.VITE_TMDB_KEY}`)  /* on the air   */
   ])
   // consume stream (data)
   const   [trendingMovie, trendingAllTv, trendingTv, tvAiringTodayTv, onTheAirTv ] = await Promise.all([
      trendingMovieRes.json(),
      trendingAllTvRes.json(),
      trendingTvRes.json(),
      tvAiringTodayTvRes.json(),
      onTheAirTvRes.json()
    ])

    return{
      trendingMovie,
      trendingAllTv, 
      tvAiringTodayTv, 
      trendingTv, 
      onTheAirTv  
    }

  } catch (error) {
     console.error('Error in Home loader',error)
     // when we getting error
     return{
         trendingMovie: { page: 0 ,results:[], total_pages: 0, total_results:0},
         onTheAirTv: { page: 0 ,results:[], total_pages: 0, total_results:0},
         trendingAllTv: { page: 0 ,results:[], total_pages: 0, total_results:0},
         trendingTv: { page: 0 ,results:[], total_pages: 0, total_results:0},
         tvAiringTodayTv: { page: 0 ,results:[], total_pages: 0, total_results:0}
     }
  }
}