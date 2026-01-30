import { useNavigate } from "react-router";
import { Card } from "./components.styled/index.styled";
import { CardSection } from "./components.styled/index.styled";
import React, { useState, useRef, useEffect } from "react";
import { addMovieToWatchList } from "../services/watchList.service";
import type { WatchListType } from "../types/WatchListType";
import { toast } from "react-toastify";
import { useGetWatchListMoviesIds } from "../hooks/useGetWatchMoviesIds";

interface CardSectionProps<T> {
  title?: string;
  data?: T[];
  children?: React.ReactNode;
}

export const CardSectionComponent = <T,>({title,data}: CardSectionProps<T>) => {
  //  console.log('p>>',data)
  const navigate = useNavigate();
  const watchListids  = useGetWatchListMoviesIds()

  const svgElement = useRef<SVGElement|null>(null)
   
  useEffect(()=>{
    const svgEle = svgElement.current
    console.log(svgEle?.dataset)
    const {movieId} = svgEle?.dataset
     if(svgEle && movieId){
        if(Array.isArray(watchListids) && watchListids.includes(parseInt(movieId))){
              
               svgEle?.classList.add('fill-[#e50913]')
        }else{
            svgEle?.classList.remove('fill-[#e50913]')
        }
     }
  },[])

  // console.log(watchListids.includes(2734))

  const [watchListAddedMessageState, setWatchListAddedMessageState] = useState<{
    status: boolean;
    message: string;
  } | null>(null);   // after watch list message & status ;

  const handleMovieDetailsPage = (e: React.MouseEvent<HTMLElement>) => {
    // console.log(e.target instanceof HTMLImageElement)

    if (e.target instanceof HTMLImageElement) {
      const { movieId } = e.currentTarget.dataset;
      // console.log(movieId)
      if (movieId) {
        navigate("movie-details", { state: { movieId } });
      }
    }
  };

  // handle adding watch list db
  const handleWatchList = (e: React.MouseEvent<SVGElement>) => {
    console.log(e.currentTarget instanceof SVGElement);
    // console.log('e')
    if (e.currentTarget instanceof SVGElement) {
      const datatype = e.currentTarget.dataset;
      // console.log('p>>',datatype.movieId)
      // console.log(data)

      // find the movie using id
      const findedData = data?.find((cu) => {
        if (cu?.id === parseInt(datatype?.movieId)) {
          return cu;
        }
      });

      addMovieToWatchList({
        dataObj: {
          id: findedData?.id | null,
          backdrop_path: findedData?.backdrop_path || null,
          name: findedData?.name || null,
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
}}
    return (
      <>
        <CardSection>
          <div className="heading-div">
            <h1>{title}</h1>
            <button>More</button>
          </div>
          <div className="card-scrolling-div">
            {data?.map((cu) => (
              <Card
                key={cu?.id}
                className="card"
                onClick={handleMovieDetailsPage}
                data-movie-id={cu?.id}
                data-title={cu?.name ? cu?.name : "N/A"}
              >
                <img
                  src={`${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/w500${
                    cu?.backdrop_path
                  }`}
                  alt="img"
                />
                <div className="absolute right-6  bottom-3  size-10">
                  {/* TODO: add logical in change watch list color if a person added in watch list */}
                  <svg
                    data-movie-id={cu?.id}
                    // add movie to watchList state.
                    onClick={handleWatchList}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="white"
                     className='size-11  transition-colors hover:fill-[#e50913]'
                     ref={svgElement}
                   >
                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                  </svg>
                </div>
              </Card>
            ))}
          </div>
        </CardSection>
      </>
    );
//   end
}