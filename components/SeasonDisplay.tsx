"use client";
import {
  useEpisodeStore,
  useSeasonStore,
  useShowDataStore,
} from "@/store/store";
import React from "react";
import { Button } from "./ui/button";
import SelectAllButtonSeasons from "./SelectAllSeasons";

const SeasonDisplay = () => {
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

  const changeSeasonSelection = (newSeason: number) => () => {
    if (newSeason != seasonSelection) {
      setSeasonSelection(newSeason);
      setEpisodeSelection(0);
    }
    forceUpdate();
  };

  const selectSeasonStatusChange = (seasonNumber: number) => () => {
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

  return (
    <div className="w-screen flex flex-col justify-center items-center">
      <h1 className="my-10 font-black text-2xl">Seasons</h1>
      <div className="my-5">
        <SelectAllButtonSeasons name="Select All" selectOrDeselect={true}  />
        <SelectAllButtonSeasons name="Deselect All" selectOrDeselect={false}  />
      </div>
      <div
        className="flex max-w-[80%] "
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit, minmax(min(140px, 100%), 1fr))",
          rowGap: "5px",
          justifyItems: "center",
          justifyContent: "center",
        }}
      >
        {showData.map((data, i) => (
          <div key={i} className="mx-20 flex flex-col mb-6">
            <Button
              key={i}
              variant={i === seasonSelection ? "selected" : "secondary"}
              onClick={changeSeasonSelection(i)}
              className="mb-4"
            >
              {data?.seasonName}
            </Button>
            <Button
              variant={showData?.[i]?.seasonStatus ? "selected" : "secondary"}
              onClick={selectSeasonStatusChange(i)}
            >
              Y
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeasonDisplay;
