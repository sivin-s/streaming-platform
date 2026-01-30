
//  add watch-list
import type {WatchListType} from '../types/WatchListType'
import { addDoc, collection, deleteDoc, doc, getDocs, query, where, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase/firebaseConfig"

interface addMovieToWatchListProps{
  dataObj: WatchListType,
  setWatchListAddedMessageState (params:{
        status: boolean,
        message: string
    }): void
}


interface deleteMovieFromListProps  {
  _id: string;
  setWatchListAddedMessageState(params:{
    message: string;
    status: boolean;
  }): void
}


//  add movie from list 
export const addMovieToWatchList  =  async (params: addMovieToWatchListProps):Promise<void>=>{
    console.log('p>',params.dataObj)
      try {
       const watchListCollection = collection(db, 'watchList');
       // check if the movie id is already exists.
       const q = query(watchListCollection, where('id','==',params.dataObj.id))
       const snapShot = await getDocs(q);       
       console.log('snapshot >>> ',snapShot.empty)
       if(snapShot.empty){
          const docRef = await addDoc(watchListCollection, {
            ...params.dataObj,
            createdAt: serverTimestamp()
          })
          console.log('dataobj >>> ',docRef)
          console.log('dataobj id >>> ',docRef.id)
          params.setWatchListAddedMessageState({
            message: "Added to the watch list",
            status: true
          })
          
       }else{
         console.log('Movie already exists in the watchlist')
        params.setWatchListAddedMessageState({
          message: 'Movie already exists in the watchlist',
          status: false
        })
       }
   } catch (err) {
       console.log('Err adding movie', err)
   }
 
}

// get movie form list
export const getMovieWatchListCollection = async ()=>{
    try {
        const movieListCollection = collection(db, "watchList");
        const querySnapshot = await getDocs(movieListCollection);
        // console.log('p>>>', res.docs.length)
        // console.log('pe>>>', res.docs[0].exists())
        // console.log('pd>>>', res.docs[0].data())
        return querySnapshot.docs  //Note:  we want to extract data from querySnapShot array (map -> cuDoc.data())
    } catch (err) {
         console.log(err)
    }
}

// delete movie from list
export const deleteMovieFromList = async (params: deleteMovieFromListProps)=>{
      // console.log('i>>>',params._id)

         try {
              const watchListCollection = collection(db, 'watchList');
           const docRef = doc(watchListCollection, params._id);
           await deleteDoc(docRef);
           params.setWatchListAddedMessageState({
            message: "successfully removed  from the watch list",
            status: true
          })
         } catch (err) {
            console.log(err)
         }
}


