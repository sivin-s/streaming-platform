import type { WatchListType } from '../types/WatchListType';
import { WatchListCard } from './components.styled/WatchListCard.styled';

interface WatchListComponentProps{
   data: WatchListType;
   deleteWatchListFn? (e:React.MouseEvent<SVGElement>) : void;
}

export const WatchListComponent:React.FC<React.PropsWithChildren<WatchListComponentProps>> = ({data,deleteWatchListFn})=>{
     
   console.log('u>>>>##',data?.name)
   console.log('u>>>>##',Array.isArray(data))

       return(<>
      {/* card */}
      <WatchListCard>
          <div className='
          rounded-tl-[0.5rem] rounded-bl-[0.5rem]
           h-[10rem]
           shrink-0 
          '>
            {/* img  */}    
                        {/* backgroundImage: `url(${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/original${(results[randomIndex]?.poster_path)})`, */}

            <img className=' rounded-tl-[0.5rem] rounded-tr-[0.5rem] h-full w-full object-cover' src={(data?.backdrop_path) ? (`${import.meta.env.VITE_TMDB_IMAGE_BASE_URL}/w500${data?.backdrop_path}`) : 'placeholder_for_img.png'} alt="img" />
          </div>
          <div className='p-1! border rounded-tl-[0.9rem]  rounded-tr-[0.9rem]  rounded-br-[0.3rem] rounded-bl-[0.3rem]    w-full h-full text-white bg-[hsl(72,_14%,_7%)]'>
             <div className='w-full h-[4.5rem]  px-2!  overflow-hidden text-ellipsis'>
                {/* title  */}
                <h1 className='font-bold mt-2! text-3xl truncate'>{data?.title || data?.name || 'N/A'}</h1>
                {/* favorite or watch list date */}
                <p className='text-[0.9rem] p-1!'>{data?.release_date?.toString() || 'NA'}</p>
             </div>
             <div className='w-full  h-[2.8rem]  flex items-center justify-end pe-3!'>
                {/* watch list or favorite remove btn */}
                <button>
                    {/* delete watchlist */}
                        <svg onClick={deleteWatchListFn} data-docid={data?._id}  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="red" className="size-10">
  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
</svg>

                </button>
             </div>
          </div>
      </WatchListCard>
    </>)
   }
