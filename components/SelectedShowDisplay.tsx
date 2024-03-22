"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import ImageDisplay from "./ImageDisplay";
import DisplayButtons from "./DisplayButtons";

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
  const [seasonSelection, setSeasonSelection] = useState(0);
  const [episodeSelection, setEpisodeSelection] = useState(0);

  const [currentSelectedEpisode, setCurrentSelectedEpisode] = useState<
    Episode | undefined
  >(showData?.[seasonSelection]?.[episodeSelection]);

  const changeSeasonSelection = (newSeason: number) => () => {
    setSeasonSelection(newSeason);
  };

  return (
    <div className="flex justify-center items-center flex-col mt-12">
      <ImageDisplay
        source={currentSelectedEpisode?.still_path}
        name={currentSelectedEpisode?.episodeTitle}
      />
      <h1>Season #</h1>
      <h1>Episode #</h1>

      <Button>Generate Random Episode</Button>

      <h1 className="my-10 font-black text-4xl">Seasons</h1>
      <div className="flex ">
        {showData.map((data, i) => (
          <div key={i} className="mx-2">
            <Button
              key={i}
              variant={i === seasonSelection ? "selected" : "secondary"}
              onClick={changeSeasonSelection(i)}
            >
              {i + 1}
            </Button>
          </div>
        ))}
      </div>
      <h1 className="my-10 font-black text-4xl">Episodes</h1>
      <div className="flex ">
        {showData[seasonSelection]?.map((data, i) => (
          <div key={i} className="mx-2">
            <Button key={i} variant="secondary">
              {i + 1}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedShowDisplay;
