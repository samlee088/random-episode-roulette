"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import ImageDisplay from "./ImageDisplay";
import DisplaySelectedEpisodeText from "./DisplaySelectedEpisodeText";
import { SelectedEpisode } from "@/type";

type Props = {
  showDataParent: (SelectedEpisode[] | undefined)[];
};
const SelectedShowDisplay = ({ showDataParent }: Props) => {
  const [seasonSelection, setSeasonSelection] = useState(0);
  const [episodeSelection, setEpisodeSelection] = useState(0);
  const [showData, setShowData] = useState(showDataParent);

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
  const [state, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const selectStatusChange = (episodeNumber: number) => () => {
    const episode = showData?.[seasonSelection]?.[episodeNumber];
    if (episode) {
      episode.status = !episode.status;
      setShowData(showData);
    }
    forceUpdate();
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
      <div
        className="flex max-w-[80%] "
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(min(70px, 100%), 1fr))",
          rowGap: "36px",
          justifyItems: "center",
          justifyContent: "center",
        }}
      >
        {showData[seasonSelection]?.map((data, i) => (
          <div key={i} className="mx-4 flex flex-col mb-6">
            <Button
              key={i}
              variant={i === episodeSelection ? "selected" : "secondary"}
              onClick={changeEpisodeSelection(i)}
              className="mb-4"
            >
              {i + 1}
            </Button>
            <Button
              variant={
                showData?.[seasonSelection]?.[i].status
                  ? "secondary"
                  : "selected"
              }
              onClick={selectStatusChange(i)}
            >
              Y
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedShowDisplay;
