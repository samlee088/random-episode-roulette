import SelectedShowDisplay from "@/components/SelectedShowDisplay";
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

  return (
    <div>
      <SelectedShowDisplay showDataParent={singleShowSeasonsEpisodesData} />
    </div>
  );
}

export default selectedShow;
