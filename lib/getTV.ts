import { Episode, SearchResults, SingleMovie } from "@/type";

async function fetchFromTMDBMultiple(url: URL, cacheTime?: number) {
  url.searchParams.set("page", "1");

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

async function fetchFromTMDBSingleShow(url: URL, cacheTime?: number) {
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

export async function getSingleTVShowData({
  series_id,
}: {
  series_id: number;
}) {
  const url = new URL(`https://api.themoviedb.org/3/tv/${series_id}`);

  const data = await fetchFromTMDBSingleShow(url);

  let numberOfSeasons = data.number_of_seasons;
  console.log(numberOfSeasons);
  let output = [];

  for (let i = 0; i <= numberOfSeasons; i++) {
    const seasonDataUrl = new URL(
      `https://api.themoviedb.org/3/tv/${series_id}/season/${i}`
    );

    const singleSeasonData = await fetchFromTMDBSingleSeason(seasonDataUrl);

    const singleSeasonDataExtract: {
      episodeNumber: number;
      episodeTitle: string;
      episodeOverview: string;
    }[] = singleSeasonData.episodes
      ? singleSeasonData.episodes.reduce(
          (
            acc: {
              episodeNumber: number;
              episodeTitle: string;
              episodeOverview: string;
            }[],
            episode: Episode
          ) => {
            acc.push({
              episodeNumber: episode.episode_number,
              episodeTitle: episode.name,
              episodeOverview: episode.overview,
            });

            return acc;
          },
          []
        )
      : [];

    output.push(singleSeasonDataExtract);
  }
  return output;
}
