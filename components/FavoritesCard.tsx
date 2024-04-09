"use client";
import React from "react";
import ImageDisplay from "./ImageDisplay";
import FavoritesCardDeleteButton from "./FavoritesCardDeleteButton";
import { useSelectedFavoriteStatus } from "@/store/store";

type Props = {
  preferencesTitle: string;
  favoritesShowData: {
    backdrop_path: string;
    name: string;
  };
  preferencesId: string;
};
const FavoritesCard = ({
  preferencesTitle,
  favoritesShowData,
  preferencesId,
}: Props) => {
  const [selectedFavoriteStatus, setSelectedFavoriteStatus] =
    useSelectedFavoriteStatus((store) => [
      store.selectedFavoriteStatus,
      store.setSelectedFavoriteStatus,
    ]);

    async function uploadSelectedFavoritePreferences() {
      
    }
  return (
    <div className="flex position: relative my-auto ml-10 justify-start w-11/12 border-t-2 ">
      <div className="flex mt-2 ">
        <ImageDisplay
          source={favoritesShowData?.backdrop_path}
          name={preferencesTitle}
        />
        <div className="flex flex-col ml-3 ">
          <h1>TV Show Name: {favoritesShowData.name}</h1>
          <h1>Preferences Name: {preferencesTitle}</h1>
        </div>
      </div>
      <div className="position: absolute right-20 mt-2 ">
        <div className=" position: absolute r-0 z-50">
          <FavoritesCardDeleteButton preferencesId={preferencesId} />
        </div>
      </div>
    </div>
  );
};

export default FavoritesCard;
