import React from "react";
import SelectAllButtonEpisodes from "./SelectAllButtonEpisodes";

const EpisodeDisplay = () => {
  return (
    <div>
      <div className="flex flex-col items-center position: relative w-screen justify-center my-5">
        <h1 className="font-black text-2xl">Episodes</h1>
        <div className="bg-gray-400 p-4 flex position: absolute right-0">
          Right-Aligned Component
        </div>
      </div>

      <div className=" flex justify-center  items-center">
        <SelectAllButtonEpisodes name="Select All" selectOrDeselect={true} />
        <SelectAllButtonEpisodes name="Deselect All" selectOrDeselect={false} />
      </div>
    </div>
  );
};

export default EpisodeDisplay;
