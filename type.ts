export type PopularShows = {
  adult: boolean;
  backdrop_path: string;
  first_air_date: string;
  genre_ids: number[];
  id: number;
  name: string;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
};

export type SearchResults = {
  page: number;
  results: PopularShows[];
  total_pages: number;
  total_results: number;
};

export type SingleMovie = {};

export type Episode = {
  air_date: string;
  episode_number: number;
  episode_type: string;
  id: number;
  name: string;
  overview: string;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string | null;
  vote_average: number;
  vote_count: number;
  crew: {
    credit_id: string;
    department: string;
    gender: number | null;
    id: number;
    job: string;
    name: string;
    profile_path: string | null;
  }[];
  guest_stars: {
    credit_id: string;
    character: string;
    id: number;
    name: string;
    order: number;
    profile_path: string | null;
  }[];
};

export type ShowSeasonData = {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
};

export type SelectedEpisode = {
  episodeNumber: number;
  episodeTitle: string;
  episodeOverview: string;
  status: boolean;
  still_path: string;
  episodeId: number;
};

/* 
single episode data:


 air_date: '2023-05-08',
      episode_number: 84,
      episode_type: 'standard',
      id: 4424383,
      name: 'Molly Shannon, Helene Yorke, and Drew Tarver',
      overview: 'Molly Shannon, Drew Tarver & Helene Yorke join host Andy Cohen.',
      production_code: '',
      runtime: 22,
      season_number: 20,
      show_id: 22980,
      still_path: '/rURwiGmqBSc0LDtWrnFgjF5MgUM.jpg',
      vote_average: 0,
      vote_count: 0,
      crew: [],
      guest_stars: [Array]
       */
