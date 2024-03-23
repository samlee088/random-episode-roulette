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
  showData: (SelectedEpisode[] | undefined)[];
  setShowData: Dispatch<SetStateAction<(SelectedEpisode[] | undefined)[]>>;
  /* selectOrDeselect: true, select all episodes for currently selected season, false deselect all episode for currently selected episode */
}) => {
  function selectDeselectAllEpisodes() {
    let output;

    if (selectOrDeselect) {
      output = showData[seasonSelection]?.map((episode) => {
        return {
          ...episode,
          status: true,
        };
      });
    } else {
      output = showData[seasonSelection]?.map((episode) => {
        return {
          ...episode,
          status: false,
        };
      });
    }
    if (output) {
      let updatedShowData = [...showData];
      updatedShowData[seasonSelection] = output;

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
