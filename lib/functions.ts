import { SelectedEpisode } from "@/type";
import React, { Dispatch, SetStateAction } from "react";

type generateRandomEpisodeProps = {
  showData: {
    seasonName: string;
    seasonEpisodes: SelectedEpisode[];
    seasonStatus: boolean;
  }[];
  seasonSelection: number;
  setSeasonSelection: Dispatch<SetStateAction<number>>;
  episodeSelection: number;
  setEpisodeSelection: Dispatch<SetStateAction<number>>;
  setCurrentSelectedEpisode: Dispatch<
    SetStateAction<SelectedEpisode | undefined>
  >;
  setShowDestructiveToast: Dispatch<SetStateAction<boolean>>;
};
const generateRandomEpisode = ({
  showData,
  seasonSelection,
  setSeasonSelection,
  episodeSelection,
  setEpisodeSelection,
  setCurrentSelectedEpisode,
  setShowDestructiveToast,
}: generateRandomEpisodeProps) => {
  let seasonDrawPool = [];

  for (let i = 0; i < showData.length; i++) {
    if (showData[i].seasonStatus) {
      seasonDrawPool.push(i);
    }
  }
  if (!seasonDrawPool.length) {
    setShowDestructiveToast(true);
    return;
  }
  let randomSeason =
    seasonDrawPool[Math.floor(seasonDrawPool.length * Math.random())];
  setSeasonSelection(randomSeason);

  let episodeDrawPool = [];
  for (let i = 0; i < showData[randomSeason].seasonEpisodes.length; i++) {
    if (showData[randomSeason].seasonEpisodes[i].status === true) {
      episodeDrawPool.push(i);
    }
  }

  let randomEpisode =
    episodeDrawPool[Math.floor(episodeDrawPool.length * Math.random())];
  setEpisodeSelection(randomEpisode);
  setCurrentSelectedEpisode(
    showData?.[seasonSelection]?.seasonEpisodes?.[episodeSelection]
  );
};

export default generateRandomEpisode;
