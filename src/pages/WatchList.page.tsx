import { useEffect, useState } from 'react'
import { WatchListComponent, PaginationComponent, LoadingComponent } from '../components/index.components'
import { getMovieWatchListCollection, deleteMovieFromList } from '../services/watchList.service';
import type {WatchListType} from '../types/WatchListType'
import { toast } from 'react-toastify';

// lottie animation json
// import lottieJson from '../lotties_animation_json/No_Data.json'

export const WatchListPage = () => {

    // TODO: pagination
    //  console.log(data.slice(((page*limit)-limit),(page*limit))) // pagination logic
    const [data, setData] = useState<WatchListType[] | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const limit = 4
    const [page, setPage] = useState(1);
    console.log('p>>', data)

    const [watchListAddedMessageState, setWatchListAddedMessageState] = useState<{
        status: boolean,
        message: string
    } | null>(null)

    useEffect(() => {
        console.log('po>>', page)
    }, [page])

    const handleDataFromFireStore = async () => {
        try {
            //    console.log(getMovieWatchListCollection())
            const res = await getMovieWatchListCollection()
            // extracting docs from object
            const extractedData = res?.map((doc: any) => ({ _id: doc.id, ...doc.data() } as WatchListType))
            setData(extractedData || [])
            //    console.log(res[0].data())
            console.log('D>', data)
        } catch (err) {
            console.log(err)
        } finally {
            setIsLoading(false)
        }
    }

    const deleteWatchListFn = (e: React.MouseEvent<SVGElement>) => {
        console.log('p>>>',e.currentTarget.dataset)
        const { docid } = e.currentTarget.dataset
        if (docid && typeof docid === 'string') {
            // console.log('doc > ',typeof docid)
            // deleteMovieFromList(docid, setWatchListAddedMessageState)
            deleteMovieFromList({_id: docid, setWatchListAddedMessageState})
            if (watchListAddedMessageState?.status) {
                // after delete update the state
              if(Array.isArray(data) && data.length>0){
                  const afterDeleteFilteredState = data.filter((cu: WatchListType)=> cu._id !== docid)
                  setData(afterDeleteFilteredState)
              }
                toast(watchListAddedMessageState?.message, {
                    type: 'success',
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                })
            } else if (!watchListAddedMessageState?.status) {
                toast(watchListAddedMessageState?.message, {
                    type: 'error',
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark"
                })

                //end if
            }
        }

    }  

        useEffect(() => {
            // TODO: loading
            handleDataFromFireStore()
        }, [])


        useEffect(() => {
            console.log('std>>>>', data)
        }, [data])


        if (isLoading) {
            return (
                <LoadingComponent />
            )
        }

        if (data && data.length > 0) {
            return (
                <>
                    <div className='h-screen   flex items-center flex-col justify-around w-full  bg-[hsl(72,_14%,_7%)]'>

                        {/*8 cards*/}
                        {/* rending multiple card  */}
                        < div className='flex flex-wrap items-center justify-center mt-[4.6rem]!  gap-4  bg-[hsl(72,_14%,_7%)] max-w-[63rem] h-[40rem]'>
                            {/*  map iteration */}
                            {data && data.length > 0 ? data.slice(((page * limit) - limit), page * limit)?.map((cu: WatchListType) => (
                                <WatchListComponent data={cu} deleteWatchListFn={deleteWatchListFn} key={cu._id} />
                            ))
                                : <div>NO Watch list</div>
                            }
                            {/* map iteration end */}
                        </div>
                    </div>

                    {/*pagination*/}
                    <div className='flex items-center   w-full'>
                        <PaginationComponent data={data} setPage={setPage} page={page} limit={limit} />
                    </div>

                </>
            )
        }

        if(!data || data.length===0){
            return(
                  <div className='h-screen   text-amber-50  flex items-center flex-col justify-around w-full  bg-[hsl(72,_14%,_7%)]'>
                                  {/* No WatchList 📽️ */}
                                    {/* <AnimationLottiePlayerComponent src={lottieJson} /> */}
                                   <div className='h-[16rem]'>
                                     <img src="popcorn.gif" alt="img" className='size-[12rem]'/>
                                    <span className='text-[2.5rem] my-11!'><p>
                                        No watch list 📽️</p> ️</span>
                                   </div>
                  </div>
            )
        }
    }