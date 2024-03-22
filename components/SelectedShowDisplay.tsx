"use client";
import React, { useState } from "react";
import { Button } from "./ui/button";
import ImageDisplay from "./ImageDisplay";
import DisplayButtons from "./DisplayButtons";
import DisplaySelectedEpisodeText from "./DisplaySelectedEpisodeText";
import { SelectedEpisode } from "@/type";

type Props = {
  showData: (SelectedEpisode[] | undefined)[];
};
const SelectedShowDisplay = ({ showData }: Props) => {
  const [seasonSelection, setSeasonSelection] = useState(0);
  const [episodeSelection, setEpisodeSelection] = useState(0);

  const [currentSelectedEpisode, setCurrentSelectedEpisode] = useState<
    SelectedEpisode | undefined
  >(showData?.[seasonSelection]?.[episodeSelection]);

  const changeSeasonSelection = (newSeason: number) => () => {
    if (newSeason != seasonSelection) {
      setSeasonSelection(newSeason);
      setEpisodeSelection(0);
      setCurrentSelectedEpisode(showData?.[newSeason]?.[0]);
    }
  };
  const changeEpisodeSelection = (newEpisode: number) => () => {
    if (newEpisode != episodeSelection) {
      setEpisodeSelection(newEpisode);
      setCurrentSelectedEpisode(showData?.[seasonSelection]?.[newEpisode]);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col mt-12">
      <ImageDisplay
        source={currentSelectedEpisode?.still_path}
        name={currentSelectedEpisode?.episodeTitle}
      />
      <DisplaySelectedEpisodeText
        season={seasonSelection}
        episode={episodeSelection}
        data={currentSelectedEpisode}
      />

      <Button>Generate Random Episode</Button>

      <h1 className="my-10 font-black text-2xl">Seasons</h1>
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
      <h1 className="my-10 font-black text-2xl">Episodes</h1>
      <div className="flex ">
        {showData[seasonSelection]?.map((data, i) => (
          <div key={i} className="mx-2">
            <Button
              key={i}
              variant={i === episodeSelection ? "selected" : "secondary"}
              onClick={changeEpisodeSelection(i)}
            >
              {i + 1}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedShowDisplay;
