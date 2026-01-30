interface WatchListType{
    backdrop_path?: string | null;  // img src path
    id?: number;
    name?: string;
    release_date?: Date;
    title?: string;
    _id?: string;
    createdAt?: any; // For Firestore server timestamp
}

export type{
    WatchListType
}