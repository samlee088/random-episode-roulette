"use client";
import React, { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";

import {
  useEpisodeStore,
  useSeasonStore,
  useShowDataStore,
} from "@/store/store";

const SelectAllButtonEpisodes = ({
  name,
  selectOrDeselect,
}: {
  name: string;
  selectOrDeselect: boolean;
  /* selectOrDeselect: true, select all episodes for currently selected season, false deselect all episode for currently selected episode */
}) => {
  const [showData, setShowData] = useShowDataStore((store) => [
    store.showData,
    store.setShowData,
  ]);
  const [seasonSelection] = useSeasonStore((store) => [store.seasonSelection]);
  const [episodeSelection] = useEpisodeStore((store) => [
    store.episodeSelection,
  ]);

  function selectDeselectAllEpisodes() {
    let output;
    let updatedShowData = [...showData];

    if (selectOrDeselect) {
      output = showData[seasonSelection]?.seasonEpisodes?.map((episode) => {
        return {
          ...episode,
          status: true,
        };
      });
      updatedShowData[seasonSelection].seasonStatus = true;
    } else {
      output = showData[seasonSelection]?.seasonEpisodes?.map((episode) => {
        return {
          ...episode,
          status: false,
        };
      });

      updatedShowData[seasonSelection].seasonStatus = false;
    }
    if (output) {
      updatedShowData[seasonSelection].seasonEpisodes = output;

      setShowData(updatedShowData);
    }
  }
  return (
    <Button
      variant="selected"
      className="mx-2"
      onClick={selectDeselectAllEpisodes}
    >
      {name}
    </Button>
  );
};

export default SelectAllButtonEpisodes;
