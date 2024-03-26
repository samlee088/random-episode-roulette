import {
  useEpisodeStore,
  useSeasonStore,
  useShowDataStore,
} from "@/store/store";
import React from "react";
import { Button } from "./ui/button";

type Props = {
  changeEpisodeSelection: (newEpisode: number) => void;
  selectStatusChange: (newEpisode: number) => void;
};

const EpisodeCompactView = ({
  changeEpisodeSelection,
  selectStatusChange,
}: Props) => {
  const [showData] = useShowDataStore((state) => [state.showData]);
  const [seasonSelection] = useSeasonStore((state) => [state.seasonSelection]);
  const [episodeSelection] = useEpisodeStore((state) => [
    state.episodeSelection,
  ]);

  return (
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
            onClick={() => changeEpisodeSelection(i)}
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
            onClick={() => selectStatusChange(i)}
          >
            Y
          </Button>
        </div>
      ))}
    </div>
  );
};
export default EpisodeCompactView;
