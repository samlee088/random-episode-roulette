"use server";

import { getSingleTVShowData } from "./getTV";

export default async function retrieveData({ showId }: { showId: number }) {
  const singleShowSeasonsEpisodesData = await getSingleTVShowData({
    series_id: showId,
  });

  return singleShowSeasonsEpisodesData;
}
