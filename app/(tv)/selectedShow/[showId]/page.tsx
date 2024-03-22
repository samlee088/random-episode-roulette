import SelectedShowDisplay from "@/components/SelectedShowDisplay";
import { Button } from "@/components/ui/button";
import { getSingleTVShowData } from "@/lib/getTV";
import React, { useState } from "react";

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
      <SelectedShowDisplay showData={singleShowSeasonsEpisodesData} />
    </div>
  );
}

export default selectedShow;
