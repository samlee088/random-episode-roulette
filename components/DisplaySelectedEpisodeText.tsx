import {
  useEpisodeStore,
  useSeasonStore,
  useShowDataStore,
} from "@/store/store";

import React from "react";

const DisplaySelectedEpisodeText = () => {
  const [showData] = useShowDataStore((state) => [state.showData]);

  const [seasonSelection] = useSeasonStore((state) => [state.seasonSelection]);

  const [episodeSelection] = useEpisodeStore((state) => [
    state.episodeSelection,
  ]);

  return (
    <div className="mt-6 flex justify-center items-center flex-col">
      <h1 className="font-black">Season</h1>
      <h1>{showData?.[seasonSelection]?.seasonName}</h1>
      <h1 className="font-black">Episode</h1>
      <h1>{episodeSelection + 1}</h1>
      <h1 className="font-black">
        Title:{" "}
        {
          showData?.[seasonSelection]?.seasonEpisodes?.[episodeSelection]
            ?.episodeTitle
        }
      </h1>
      <h1 className="max-w-[80%]">
        {
          showData?.[seasonSelection]?.seasonEpisodes?.[episodeSelection]
            .episodeOverview
        }
      </h1>
    </div>
  );
};

export default DisplaySelectedEpisodeText;
