import React from "react";
import SelectAllButtonEpisodes from "./SelectAllButtonEpisodes";
import RadioGroupComponent from "./RadioGroupComponent";
import {
  useEpisodeStore,
  useRadioSelection,
  useSeasonStore,
  useShowDataStore,
} from "@/store/store";
import EpisodeCompactView from "./EpisodeCompactView";
import EpisodeListView from "./EpisodeListView";

const EpisodeDisplay = () => {
  const [radioSelection] = useRadioSelection((state) => [state.radioSelection]);
  const [showData, setShowData] = useShowDataStore((state) => [
    state.showData,
    state.setShowData,
  ]);
  const [seasonSelection] = useSeasonStore((state) => [state.seasonSelection]);
  const [episodeSelection, setEpisodeSelection] = useEpisodeStore((state) => [
    state.episodeSelection,
    state.setEpisodeSelection,
  ]);
  const [state, updateState] = React.useState({});
  const forceUpdate = React.useCallback(() => updateState({}), []);

  const changeEpisodeSelection = (newEpisode: number) => {
    if (newEpisode != episodeSelection) {
      setEpisodeSelection(newEpisode);
    }
    forceUpdate();
  };

  const selectStatusChange = (episodeNumber: number) => {
    const episode =
      showData?.[seasonSelection]?.seasonEpisodes?.[episodeNumber];
    if (episode) {
      episode.status = !episode.status;
    }

    const noEpisodeInSeasonSelected = showData[
      seasonSelection
    ].seasonEpisodes.every((episode) => episode.status === false);

    if (noEpisodeInSeasonSelected) {
      showData[seasonSelection].seasonStatus = false;
    } else {
      showData[seasonSelection].seasonStatus = true;
    }
    setShowData(showData);
    forceUpdate();
  };

  return (
    <div>
      <div className="flex items-center position: relative w-screen justify-center my-5">
        <h1 className="font-black text-2xl">Episodes</h1>
        <div className=" flex position: absolute right-20">
          <RadioGroupComponent />
        </div>
      </div>

      <div className=" flex justify-center  items-center">
        <SelectAllButtonEpisodes name="Select All" selectOrDeselect={true} />
        <SelectAllButtonEpisodes name="Deselect All" selectOrDeselect={false} />
      </div>

      <div className=" flex justify-center  items-center my-5">
        {radioSelection === "compact" ? (
          <EpisodeCompactView
            changeEpisodeSelection={changeEpisodeSelection}
            selectStatusChange={selectStatusChange}
          />
        ) : (
          <EpisodeListView selectStatusChange={selectStatusChange} />
        )}
      </div>
    </div>
  );
};

export default EpisodeDisplay;
