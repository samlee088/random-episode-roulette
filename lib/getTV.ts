import { SearchResults } from "@/type";

async function fetchFromTMDB(url: URL, cacheTime?: number) {
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
  const data = await fetchFromTMDB(url);
  console.log(data);
  return data.results;
}
