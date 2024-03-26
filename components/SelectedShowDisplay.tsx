"use client";
import React, { useEffect, useState } from "react";
import ImageDisplay from "./ImageDisplay";
import DisplaySelectedEpisodeText from "./DisplaySelectedEpisodeText";
import { SelectedEpisode } from "@/type";
import {
  useEpisodeStore,
  useSeasonStore,
  useShowDataStore,
} from "@/store/store";
import GenerateRandomEpisodeButton from "./GenerateRandomEpisodeButton";
import EpisodeDisplay from "./EpisodeDisplay";
import SeasonDisplay from "./SeasonDisplay";

type Props = {
  showDataParent: {
    seasonName: string;
    seasonEpisodes: SelectedEpisode[];
    seasonStatus: boolean;
  }[];
};

const SelectedShowDisplay = ({ showDataParent }: Props) => {
  const [showData, setShowData] = useShowDataStore((state) => [
    state.showData,
    state.setShowData,
  ]);
  const [seasonSelection] = useSeasonStore((state) => [state.seasonSelection]);
  const [episodeSelection] = useEpisodeStore((state) => [
    state.episodeSelection,
  ]);

  useEffect(() => {
    setShowData(showDataParent);
  }, [showDataParent]);

  return (
    <div className="flex justify-center items-center flex-col mt-12">
      <ImageDisplay
        source={
          showData?.[seasonSelection]?.seasonEpisodes?.[episodeSelection]
            ?.still_path
        }
        name={
          showData?.[seasonSelection]?.seasonEpisodes?.[episodeSelection]
            ?.episodeTitle
        }
      />
      <GenerateRandomEpisodeButton />
      <DisplaySelectedEpisodeText />
      <SeasonDisplay />

      <EpisodeDisplay />
    </div>
  );
};

export default SelectedShowDisplay;
