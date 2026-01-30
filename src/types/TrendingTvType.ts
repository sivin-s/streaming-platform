
interface TrendingTv{
     adult: boolean;
     backdrop_path: string;
    id: number;
            name: string;
            original_name: string;
            overview: string;
            poster_path: string;
            media_type: string;
            original_language: string;
            genre_ids: Array<number>[];
            popularity: number;
            first_air_date: Date;
            vote_average: number;
            vote_count: number,
            origin_country: Array<string>[]
}

export interface TreadingTvApiResponseType{
    page: number;
    results: TrendingTv[];
    total_pages: number;
    total_results: number
}