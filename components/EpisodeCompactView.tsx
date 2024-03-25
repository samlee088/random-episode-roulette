import {
  useEpisodeStore,
  useSeasonStore,
  useShowDataStore,
} from "@/store/store";
import React from "react";
import { Button } from "./ui/button";

type Props = {
  changeEpisodeSelection: (id: number) => void;
  selectStatusChange: (id: number) => void;
};

const EpisodeCompactView = ({
  changeEpisodeSelection,
  selectStatusChange,
}: Props) => {
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
