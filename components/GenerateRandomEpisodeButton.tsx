import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import {
  useEpisodeStore,
  useSeasonStore,
  useShowDataStore,
} from "@/store/store";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

const GenerateRandomEpisodeButton = () => {
  const [showData] = useShowDataStore((state) => [state.showData]);
  const [seasonSelection, setSeasonSelection] = useSeasonStore((state) => [
    state.seasonSelection,
    state.setSeasonSelection,
  ]);
  const [episodeSelection, setEpisodeSelection] = useEpisodeStore((state) => [
    state.episodeSelection,
    state.setEpisodeSelection,
  ]);
  const { toast } = useToast();
  const [showDestructiveToast, setShowDestructiveToast] = useState(false);
  useEffect(() => {
    if (showDestructiveToast) {
      toast({
        variant: "destructive",
        title: "No Season and No Episode Available",
        description:
          "Please go back and select at least one episode for random episode generator",
        action: <ToastAction altText="Go Back">Close</ToastAction>,
        className: "bg-red-800",
      });
    }

    setShowDestructiveToast(false);
  }, [showDestructiveToast]);

  function generateRandomEpisode() {
    let seasonDrawPool = [];

    for (let i = 0; i < showData.length; i++) {
      if (showData[i].seasonStatus) {
        seasonDrawPool.push(i);
      }
    }
    if (!seasonDrawPool.length) {
      setShowDestructiveToast(true);
      return;
    }
    let randomSeason =
      seasonDrawPool[Math.floor(seasonDrawPool.length * Math.random())];
    setSeasonSelection(randomSeason);

    let episodeDrawPool = [];
    for (let i = 0; i < showData[randomSeason].seasonEpisodes.length; i++) {
      if (showData[randomSeason].seasonEpisodes[i].status === true) {
        episodeDrawPool.push(i);
      }
    }

    let randomEpisode =
      episodeDrawPool[Math.floor(episodeDrawPool.length * Math.random())];
    setEpisodeSelection(randomEpisode);
  }

  return (
    <Button
      onClick={() => generateRandomEpisode()}
      variant="selected"
      className="mt-10"
    >
      Generate Random Episode
    </Button>
  );
};

export default GenerateRandomEpisodeButton;
