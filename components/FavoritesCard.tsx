"use client";
import React from "react";
import ImageDisplay from "./ImageDisplay";

type Props = {
  preferencesTitle: string;
  favoritesShowData: {
    backdrop_path: string;
    name: string;
  };
};
const FavoritesCard = ({ preferencesTitle, favoritesShowData }: Props) => {
  return (
    <div>
      <div className="flex position: relative my-auto ml-10 justify-start w-11/12 border-t-2 ">
        <div className="flex mt-2 ">
          <ImageDisplay
            source={favoritesShowData?.backdrop_path}
            name={preferencesTitle}
          />

          <div className="ml-3 text-wrap">
            <h1>TV Show Name: {favoritesShowData.name}</h1>
            <h1>Preferences Name: {preferencesTitle}</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FavoritesCard;
