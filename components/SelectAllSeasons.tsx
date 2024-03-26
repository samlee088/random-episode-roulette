"use client";
import React, { Dispatch, SetStateAction } from "react";
import { Button } from "./ui/button";
import { SelectedEpisode } from "@/type";
import {
  useEpisodeStore,
  useSeasonStore,
  useShowDataStore,
} from "@/store/store";

const SelectAllButtonSeasons = ({
  name,
  selectOrDeselect,
}: {
  name: string;
  selectOrDeselect: boolean;
  /* selectOrDeselect: true, select all episodes for currently selected season, false deselect all episode for currently selected episode */
}) => {
  const [showData, setShowData] = useShowDataStore((state) => [
    state.showData,
    state.setShowData,
  ]);
  const [seasonSelection, setSeasonSelection] = useSeasonStore((state) => [
    state.seasonSelection,
    state.setSeasonSelection,
  ]);
  const [episodeSelection, setEpisodeSelection] = useEpisodeStore((state) => [
    state.episodeSelection,
    state.setEpisodeSelection,
  ]);

  const [state, updateState] = React.useState({});
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const selectAllSeasonsStatusChange = (seasonNumber: number) => () => {
    const season = showData?.[seasonNumber];
    let seasonStatus = showData?.[seasonNumber].seasonStatus;
    if (season) {
      seasonStatus = !seasonStatus;
    }

    let updatedData = showData?.[seasonNumber].seasonEpisodes.map((episode) => {
      let data = { ...episode };
      if (seasonStatus) {
        data.status = true;
      } else {
        data.status = false;
      }

      return data;
    });

    showData[seasonNumber].seasonStatus = seasonStatus;
    showData[seasonNumber].seasonEpisodes = updatedData;
    setShowData(showData);
    forceUpdate();
  };

  function selectDeselectAllSeasons() {
    let updatedShowData = [...showData];

    for (let i = 0; i < updatedShowData.length; i++) {
      const season = updatedShowData?.[i];
      let seasonStatus = season.seasonStatus;
      if (season) {
        if (selectOrDeselect) {
          seasonStatus = true;
        } else {
          seasonStatus = false;
        }
      }

      let updateEpisodeData = updatedShowData?.[i].seasonEpisodes.map(
        (episode) => {
          let data = { ...episode };
          if (seasonStatus) {
            data.status = true;
          } else {
            data.status = false;
          }

          return data;
        }
      );

      updatedShowData[i].seasonStatus = seasonStatus;
      updatedShowData[i].seasonEpisodes = updateEpisodeData;
      setShowData(updatedShowData);
      forceUpdate();
    }
  }
  return (
    <Button
      variant="selected"
      className="mx-2"
      onClick={selectDeselectAllSeasons}
    >
      {name}
    </Button>
  );
};

export default SelectAllButtonSeasons;
