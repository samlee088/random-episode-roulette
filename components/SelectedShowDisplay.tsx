"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import ImageDisplay from "./ImageDisplay";
import DisplaySelectedEpisodeText from "./DisplaySelectedEpisodeText";
import { SelectedEpisode } from "@/type";
import SelectAllButtonEpisodes from "./SelectAllButtonEpisodes";
import SelectAllButtonSeasons from "./SelectAllSeasons";
import {
  useEpisodeStore,
  useSeasonStore,
  useShowDataStore,
} from "@/store/store";
import GenerateRandomEpisodeButton from "./GenerateRandomEpisodeButton";

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
  const [seasonSelection, setSeasonSelection] = useSeasonStore((state) => [
    state.seasonSelection,
    state.setSeasonSelection,
  ]);
  const [episodeSelection, setEpisodeSelection] = useEpisodeStore((state) => [
    state.episodeSelection,
    state.setEpisodeSelection,
  ]);

  useEffect(() => {
    setShowData(showDataParent);
    setSeasonSelection(0);
    setEpisodeSelection(0);
  }, [showDataParent]);

  const [state, updateState] = React.useState({});
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const changeSeasonSelection = (newSeason: number) => () => {
    if (newSeason != seasonSelection) {
      setSeasonSelection(newSeason);
      setEpisodeSelection(0);
    }
    forceUpdate();
  };
  const changeEpisodeSelection = (newEpisode: number) => () => {
    if (newEpisode != episodeSelection) {
      setEpisodeSelection(newEpisode);
    }
    forceUpdate();
  };

  const selectStatusChange = (episodeNumber: number) => () => {
    const episode =
      showData?.[seasonSelection]?.seasonEpisodes?.[episodeNumber];
    if (episode) {
      episode.status = !episode.status;
      setShowData(showData);
    }

    const noEpisodeInSeasonSelected = showData[
      seasonSelection
    ].seasonEpisodes.every((episode) => episode.status === false);

    if (noEpisodeInSeasonSelected) {
      showData[seasonSelection].seasonStatus = false;
    } else {
      showData[seasonSelection].seasonStatus = true;
    }

    forceUpdate();
  };

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

      <h1 className="my-10 font-black text-2xl">Seasons</h1>
      {/* <div className="my-5">
        <SelectAllButtonSeasons name="Select All" selectOrDeselect={true} />
        <SelectAllButtonSeasons name="Deselect All" selectOrDeselect={false} />
      </div> */}
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
              variant={
                showData?.[seasonSelection]?.seasonEpisodes?.[i]?.status
                  ? "selected"
                  : "secondary"
              }
              onClick={selectStatusChange(i)}
            >
              Y
            </Button>
          </div>
        ))}
      </div>
      <h1 className="mt-10 font-black text-2xl">Episodes</h1>
      <div className="my-5">
        <SelectAllButtonEpisodes name="Select All" selectOrDeselect={true} />
        <SelectAllButtonEpisodes name="Deselect All" selectOrDeselect={false} />
      </div>
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
        {showData[seasonSelection]?.seasonEpisodes?.map((data, i) => (
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
                showData?.[seasonSelection]?.seasonEpisodes?.[i].status
                  ? "selected"
                  : "secondary"
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
