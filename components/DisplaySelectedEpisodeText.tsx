import { SelectedEpisode } from "@/type";
import React from "react";

type Props = {
  season: string;
  episode: number;
  data: SelectedEpisode | undefined;
};

const DisplaySelectedEpisodeText = ({ season, episode, data }: Props) => {
  return (
    <div className="mt-6 flex justify-center items-center flex-col">
      <h1 className="font-black">Season</h1>
      <h1>{season}</h1>
      <h1 className="font-black">Episode</h1>
      <h1>{episode + 1}</h1>
      <h1 className="font-black">Title: {data?.episodeTitle}</h1>
      <h1 className="max-w-[80%]">{data?.episodeOverview}</h1>
    </div>
  );
};

export default DisplaySelectedEpisodeText;
