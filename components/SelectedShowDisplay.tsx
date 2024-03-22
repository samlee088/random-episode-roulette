import React from "react";
import { Button } from "./ui/button";

type Episode = {
  episodeNumber: number;
  episodeTitle: string;
  episodeOverview: string;
  status: boolean;
};

type Props = {
  showData: (Episode[] | undefined)[];
};
const SelectedShowDisplay = ({ showData }: Props) => {
  return (
    <div className="flex justify-center items-center flex-col mt-48">
      <h1>Season #</h1>
      <h1>Episode #</h1>
      <p>Episode Description</p>

      <Button>Generate Random Episode</Button>
      <h1>Number of Seasons</h1>
      {showData.map((data, i) => i + 1)}
    </div>
  );
};

export default SelectedShowDisplay;
