interface TrendingAllTv{
    adult: boolean;
            backdrop_path: string;
            id: number;
            title: string;
            original_title: string;
            overview:  string;
            poster_path: string;
            media_type: string;
            original_language: string;
            genre_ids: number[];
            popularity: number;
            release_date:Date ;
            video: false,
            vote_average: number;
            vote_count: number;
}

export interface TrendingAllTvApiResponseType{
    page: number;
    results: TrendingAllTv[]
    total_pages: number;
    total_results: number;
}