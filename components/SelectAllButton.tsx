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
}) => {
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

export default SelectAllButton;
