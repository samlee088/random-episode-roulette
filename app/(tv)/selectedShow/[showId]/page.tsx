import { getSingleTVShowData } from "@/lib/getTV";
import React from "react";

type Props = {
  params: {
    showId: number;
  };
};
async function selectedShow({ params: { showId } }: Props) {
  const singleShowSeasonsEpisodesData = await getSingleTVShowData({
    series_id: showId,
  });
  console.log(singleShowSeasonsEpisodesData);
  let numberOfSeasons = singleShowSeasonsEpisodesData.length;

  return (
    <div>
     <h1>Number of Seasons</h1>
      {singleShowSeasonsEpisodesData.map((data,i) => (
        i
      ) )}
    </div>
  );
}

export default selectedShow;
