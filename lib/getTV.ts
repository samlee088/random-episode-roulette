import {
  Episode,
  SearchResults,
  ShowSeasonData,
  SingleMovie,
  TVShowSeasonData,
} from "@/type";

async function fetchFromTMDBMultiple(url: URL, cacheTime?: number) {
  // url.searchParams.set("page", "1");

  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
    next: {
      revalidate: cacheTime || 60 * 60 * 24,
    },
  };

  const request = await fetch(url.toString(), options);
  const data = (await request.json()) as SearchResults;

  return data;
}

export async function getPopularTVShows() {
  const url = new URL("https://api.themoviedb.org/3/tv/popular");
  const data = await fetchFromTMDBMultiple(url);

  return data.results;
}

async function fetchFromTMDBSingleSeason(url: URL, cacheTime?: number) {
  const options: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
  };

  const request = await fetch(url.toString(), options);
  //   const data = (await request.json()) as SingleMovie;
  const data = await request.json();
  return data;
}

async function fetchSeasonData(series_id: number, season_number: number) {
  const url = new URL(
    `https://api.themoviedb.org/3/tv/${series_id}/season/${season_number}`
  );

  const data = await fetchFromTMDBSingleSeason(url);
  console.log(data);
  if (!data.episodes) {
    return;
  }

  const seasonDataExtract: {
    episodeId: number;
    episodeNumber: number;
    episodeTitle: string;
    episodeOverview: string;
    status: boolean;
    still_path: string;
  }[] = data.episodes.map((episode: Episode) => {
    return {
      episodeId: episode.id,
      episodeNumber: episode.episode_number,
      episodeTitle: episode.name,
      episodeOverview: episode.overview,
      still_path: episode.still_path,
      status: true,
    };
  });

  return {
    seasonName: data.name,
    seasonEpisodes: seasonDataExtract,
    seasonStatus: true,
  };
}

export async function getSingleTVShowData({
  series_id,
}: {
  series_id: number;
}) {
  const data = await fetchFromTMDBSingleSeason(
    new URL(`https://api.themoviedb.org/3/tv/${series_id}`)
  );

  let seasonsRequest = data.seasons.map((season: ShowSeasonData) => {
    return season.season_number;
  });

  let requests = [];

  for (let i = 0; i < seasonsRequest.length; i++) {
    requests.push(fetchSeasonData(series_id, seasonsRequest[i]));
  }

  let responses = (await Promise.all(requests)) as TVShowSeasonData[];

  if (responses.length === 0) {
    throw new Error("No season data found");
  }

  return responses;
}
