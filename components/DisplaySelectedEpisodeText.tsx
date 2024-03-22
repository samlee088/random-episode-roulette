import { SelectedEpisode } from "@/type";
import React from "react";

type Props = {
  season: number;
  episode: number;
  data: SelectedEpisode | undefined;
};

const DisplaySelectedEpisodeText = ({ season, episode, data }: Props) => {
  return (
    <div className="mt-6 flex justify-center items-center flex-col">
      <h1>Season #</h1>
      <h1>{season + 1}</h1>
      <h1>Episode #</h1>
      <h1>{episode + 1}</h1>
      <h1>Episode Title: {data?.episodeTitle}</h1>
      <h1 className="max-w-[80%]">{data?.episodeOverview}</h1>
    </div>
  );
};

export default DisplaySelectedEpisodeText;
