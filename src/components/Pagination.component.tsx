import {Pagination} from './components.styled/index.styled'
import type {WatchListType} from '../types/WatchListType'

interface PaginationComponentProps{
  data: WatchListType[];
  setPage (p: number) :void;
  page: number;
  limit: number;
}
export const PaginationComponent: React.FC<React.PropsWithChildren<PaginationComponentProps>> = ({data,setPage,page,limit})=>{
  // TODO:  pagination is pending....
  //  console.log(data._id)
     
    //  console.log(data)
    //  console.log(data.slice(((page*limit)-limit),(page*limit))) // pagination logic

    return(
       <Pagination>
           <button className='prev-btn' 
           onClick={()=> setPage(page-1)}
           disabled={true}
           >
            {/* prev  */}
           {
            page >= Math.ceil(data.length/limit)? (
                 <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path d="M9.195 18.44c1.25.714 2.805-.189 2.805-1.629v-2.34l6.945 3.968c1.25.715 2.805-.188 2.805-1.628V8.69c0-1.44-1.555-2.343-2.805-1.628L12 11.029v-2.34c0-1.44-1.555-2.343-2.805-1.628l-7.108 4.061c-1.26.72-1.26 2.536 0 3.256l7.108 4.061Z" />
</svg>

            ):''
           }
           </button>
           {/* limit 4 */}
           {/* TODO: add color to span when select */}
           {
             ( data && data.length>0 ) ?  Array.from({length: data.length}).slice(((page*limit)-limit),page*limit)?.map((_,index)=>(
                  <span className={`${(page === index+1)? `bg-red-500`: ''} `}   key={index} onClick={()=> setPage(index+1)}>{index+1}</span>
            )) : ''
           }
           <button className='next-btn'  disabled={true}>
            {/* next  */}
            {
               page >= Math.ceil(data.length/limit )? (
                 <svg onClick={()=> setPage(page+1)}   xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
  <path d="M5.055 7.06C3.805 6.347 2.25 7.25 2.25 8.69v8.122c0 1.44 1.555 2.343 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.343 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256l-7.108-4.061C13.555 6.346 12 7.249 12 8.689v2.34L5.055 7.061Z" />
</svg>
               ):'' 
            }

           </button>
        </Pagination>
    )
}