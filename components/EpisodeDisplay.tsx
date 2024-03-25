import React from "react";
import SelectAllButtonEpisodes from "./SelectAllButtonEpisodes";
import RadioGroupComponent from "./RadioGroupComponent";

const EpisodeDisplay = () => {
  return (
    <div>
      <div className="flex flex-col items-center position: relative w-screen justify-center my-5">
        <h1 className="font-black text-2xl">Episodes</h1>
        <div className=" flex position: absolute right-20">
          <RadioGroupComponent />
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
