import { Episode, SearchResults, ShowSeasonData, SingleMovie } from "@/type";

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

  if (!data.episodes) {
    return;
  }

  const seasonDataExtract: {
    episodeNumber: number;
    episodeTitle: string;
    episodeOverview: string;
    status: boolean;
  }[] = data.episodes.map((episode: Episode) => {
    return {
      episodeNumber: episode.episode_number,
      episodeTitle: episode.name,
      episodeOverview: episode.overview,
      status: true,
    };
  });

  return seasonDataExtract;
}

export async function getSingleTVShowData({
  series_id,
}: {
  series_id: number;
}) {
  const data = await fetchFromTMDBSingleSeason(
    new URL(`https://api.themoviedb.org/3/tv/${series_id}`)
  );

  let requests = [];

  let seasonsRequest = data.seasons.map((season: ShowSeasonData) => {
    return season.season_number;
  });

  for (let i = 0; i < seasonsRequest.length; i++) {
    requests.push(fetchSeasonData(series_id, seasonsRequest[i]));
  }

  let responses = await Promise.all(requests);

  return responses;
}
