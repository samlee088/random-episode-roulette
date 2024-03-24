"use client";
import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import ImageDisplay from "./ImageDisplay";
import DisplaySelectedEpisodeText from "./DisplaySelectedEpisodeText";
import { SelectedEpisode } from "@/type";
import SelectAllButton from "./SelectAllButton";
import generateRandomEpisode from "@/lib/functions";

import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  showDataParent: {
    seasonName: string;
    seasonEpisodes: SelectedEpisode[];
    seasonStatus: boolean;
  }[];
};

const SelectedShowDisplay = ({ showDataParent }: Props) => {
  const [seasonSelection, setSeasonSelection] = useState(0);
  const [episodeSelection, setEpisodeSelection] = useState(0);
  const [showData, setShowData] = useState(showDataParent);

  const { toast } = useToast();
  const [showDestructiveToast, setShowDestructiveToast] = useState(false);

  const [currentSelectedEpisode, setCurrentSelectedEpisode] = useState<
    SelectedEpisode | undefined
  >(showData?.[seasonSelection]?.seasonEpisodes?.[episodeSelection]);

  const [state, updateState] = React.useState({});
  const forceUpdate = React.useCallback(() => updateState({}), []);

  useEffect(() => {
    toast({
      variant: "destructive",
      title: "No Season and No Episode Available",
      description:
        "Please go back and select at least one episode for random episode generator",
      action: <ToastAction altText="Go Back">Close</ToastAction>,
      className: "bg-red-800",
    });

    setShowDestructiveToast(false);
  }, [showDestructiveToast]);
  const changeSeasonSelection = (newSeason: number) => () => {
    if (newSeason != seasonSelection) {
      setSeasonSelection(newSeason);
      setEpisodeSelection(0);
      setCurrentSelectedEpisode(showData?.[newSeason]?.seasonEpisodes?.[0]);
    }
  };
  const changeEpisodeSelection = (newEpisode: number) => () => {
    if (newEpisode != episodeSelection) {
      setEpisodeSelection(newEpisode);
      setCurrentSelectedEpisode(
        showData?.[seasonSelection]?.seasonEpisodes?.[newEpisode]
      );
    }
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
        source={currentSelectedEpisode?.still_path}
        name={currentSelectedEpisode?.episodeTitle}
      />
      <Button
        onClick={() =>
          generateRandomEpisode({
            showData: showData,
            setSeasonSelection: setSeasonSelection,
            setEpisodeSelection: setEpisodeSelection,
            setCurrentSelectedEpisode: setCurrentSelectedEpisode,
            seasonSelection: seasonSelection,
            episodeSelection: episodeSelection,
            setShowDestructiveToast: setShowDestructiveToast,
          })
        }
        variant="selected"
        className="mt-10"
      >
        Generate Random Episode
      </Button>
      <DisplaySelectedEpisodeText
        season={showData[seasonSelection].seasonName}
        episode={episodeSelection}
        data={currentSelectedEpisode}
      />

      <h1 className="my-10 font-black text-2xl">Seasons</h1>
      <div className="flex ">
        {showData.map((data, i) => (
          <div key={i} className="mx-2">
            <Button
              key={i}
              variant={i === seasonSelection ? "selected" : "secondary"}
              onClick={changeSeasonSelection(i)}
            >
              {data?.seasonName}
            </Button>
          </div>
        ))}
      </div>
      <h1 className="mt-10 font-black text-2xl">Episodes</h1>
      <div className="my-5">
        <SelectAllButton
          name="Select All"
          seasonSelection={seasonSelection}
          selectOrDeselect={true}
          showData={showData}
          setShowData={setShowData}
        />
        <SelectAllButton
          name="Deselect All"
          seasonSelection={seasonSelection}
          selectOrDeselect={false}
          showData={showData}
          setShowData={setShowData}
        />
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
