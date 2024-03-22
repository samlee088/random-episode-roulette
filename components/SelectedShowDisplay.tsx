"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import ImageDisplay from "./ImageDisplay";

type Episode = {
  episodeNumber: number;
  episodeTitle: string;
  episodeOverview: string;
  status: boolean;
  still_path: string;
  episodeId: number;
};

type Props = {
  showData: (Episode[] | undefined)[];
};
const SelectedShowDisplay = ({ showData }: Props) => {
  const [currentSelectedEpisode, setCurrentSelectedEpisode] = useState(
    showData?.[0]?.[0]
  );

  return (
    <div className="flex justify-center items-center flex-col mt-48">
      <ImageDisplay
        source={currentSelectedEpisode?.still_path}
        name={currentSelectedEpisode?.episodeTitle}
      />
      <h1>Season #</h1>
      <h1>Episode #</h1>

      <Button>Generate Random Episode</Button>
      <h1>Number of Seasons</h1>
      {showData.map((data, i) => i + 1)}
    </div>
  );
};

export default SelectedShowDisplay;
