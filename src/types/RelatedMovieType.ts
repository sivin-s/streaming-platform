
interface RelatedMovieData{
     
            adult: boolean;
            backdrop_path: string;
            id: number;
            title: string;
            original_title: string;
            overview: string;
            media_type: string;
            original_language: string;
            genre_ids: Array<number>;
            popularity: number;
            release_date: Date;
            video: boolean;
            vote_average: number;
            vote_count: number;
}

export interface RelatedMovieDataApiResponseType{
    
    page: 1;
    results: RelatedMovieData[]
    total_pages: number;
    total_results: number;

}