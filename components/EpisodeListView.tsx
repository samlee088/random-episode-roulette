import React from "react";
import { Button } from "./ui/button";
import {
  useEpisodeStore,
  useSeasonStore,
  useShowDataStore,
} from "@/store/store";
import ImageDisplay from "./ImageDisplay";

type Props = {

  selectStatusChange: (newEpisode: number) => void;
};

const EpisodeListView = ({

  selectStatusChange,
}: Props) => {
  const [showData] = useShowDataStore((state) => [state.showData]);
  const [seasonSelection] = useSeasonStore((state) => [state.seasonSelection]);
  const [episodeSelection] = useEpisodeStore((state) => [
    state.episodeSelection,
  ]);

  return (
    <div className="mt-20 w-screen flex flex-col ">
      {showData[seasonSelection]?.seasonEpisodes?.map((data, i) => (
        <div
          key={i}
          className="flex position: relative my-auto ml-10 justify-start w-11/12 border-t-2 "
        >
          <div className="flex mt-2 ">
            <ImageDisplay source={data?.still_path} name={data?.episodeTitle} />

            <div className="ml-3 text-wrap">
              <h1>Season: {showData[seasonSelection]?.seasonName}</h1>
              <h1>Episode: {i + 1}</h1>
              <h1>Title: {data.episodeTitle}</h1>

              <h1 className="text-wrap mt-10">{data.episodeOverview}</h1>
            </div>
          </div>
          <div className="position: absolute right-0 mt-2 ">
            <Button
              variant={
                showData?.[seasonSelection]?.seasonEpisodes?.[i].status
                  ? "selected"
                  : "secondary"
              }
              onClick={() => selectStatusChange(i)}
            >
              Y
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EpisodeListView;
