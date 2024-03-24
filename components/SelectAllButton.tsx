"use client";
import React, { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import { SelectedEpisode } from "@/type";

const SelectAllButton = ({
  name,
  seasonSelection,
  selectOrDeselect,
  setShowData,
  showData,
  seasonPool,
  setSeasonPool,
}: {
  name: string;
  seasonSelection: number;
  selectOrDeselect: boolean;
  showData: {
    seasonName: string;
    seasonEpisodes: SelectedEpisode[];
    seasonStatus: boolean;
  }[];
  setShowData: Dispatch<
    SetStateAction<
      {
        seasonName: string;
        seasonEpisodes: SelectedEpisode[];
        seasonStatus: boolean;
      }[]
    >
  >;
  /* selectOrDeselect: true, select all episodes for currently selected season, false deselect all episode for currently selected episode */
  seasonPool: boolean[];
  setSeasonPool: Dispatch<SetStateAction<boolean[]>>;
}) => {
  function selectDeselectAllEpisodes() {
    let output;
    let updateSeasonStatus = [...seasonPool];

    if (selectOrDeselect) {
      output = showData[seasonSelection]?.seasonEpisodes?.map((episode) => {
        return {
          ...episode,
          status: true,
        };
      });
      updateSeasonStatus[seasonSelection] = true;
    } else {
      output = showData[seasonSelection]?.seasonEpisodes?.map((episode) => {
        return {
          ...episode,
          status: false,
        };
      });

      updateSeasonStatus[seasonSelection] = false;
    }
    setSeasonPool([...updateSeasonStatus]);
    if (output) {
      let updatedShowData = [...showData];
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

export default SelectAllButton;
