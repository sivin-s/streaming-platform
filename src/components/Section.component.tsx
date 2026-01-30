import {Section} from './components.styled/index.styled'
import React from 'react'
import {CardSectionComponent, HeroSectionComponent} from './index.components'
import {useHomeMovieLoader} from '../hooks/useMoviesLoader'



export const SectionComponent:React.FC<React.PropsWithChildren> = ()=>{
     const {onTheAirTv,
      trendingAllTv,
      trendingMovie,
      trendingTv,
      tvAiringTodayTv
     } = useHomeMovieLoader()  // route loader

   return(
    <>
       <Section >
        <HeroSectionComponent  />
       <CardSectionComponent title="On The Air TV"  data={onTheAirTv?.results}/>
       <CardSectionComponent title="Trending All TV" data={trendingAllTv?.results} />
       <CardSectionComponent title="Trending Movie" data={trendingMovie?.results}/>
       <CardSectionComponent title="Trending TV" data={trendingTv?.results}/>
       <CardSectionComponent title="Tv Airing Today TV" data={tvAiringTodayTv?.results}/>
    </Section>
    </>
   )
}