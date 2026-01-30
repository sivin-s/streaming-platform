
import  type  {OnTheAirApiResponseType} from  './OnTheAirTvType.ts'
import  type  {TrendingAllTvApiResponseType} from  './TrendingAllTvType.ts'
import  type  {TreadingTvApiResponseType} from  './TrendingTvType.ts'
import  type  {AiringTodayTvApiResponseType} from  './TvAiringTodayTvType.ts'
import  type  {TrendingMovieApiResponseType} from  './TrendingMovieType.ts'

export type HomeLoaderType={
     trendingMovie: TrendingMovieApiResponseType;
  trendingAllTv: TrendingAllTvApiResponseType;
  trendingTv: TreadingTvApiResponseType;
  tvAiringTodayTv: AiringTodayTvApiResponseType;
  onTheAirTv  : OnTheAirApiResponseType;
}
