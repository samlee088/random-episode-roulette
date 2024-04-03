import {
  PreferencesTitle,
  grabFavoriteTitleRef,
} from "@/lib/converters/Preferences";
import { FavoriteTitle } from "@/type";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";

const FavoritesCardDisplayRow = ({
  preferencesId,
}: {
  preferencesId: string;
}) => {
  const [favoriteData, loading, error] = useCollectionData<PreferencesTitle>(
    grabFavoriteTitleRef(preferencesId)
  );
  return (
    <div>
      {favoriteData?.map((title, i) => (
        <div key={i}>{title.preferencesTitle}</div>
      ))}
    </div>
  );
};

export default FavoritesCardDisplayRow;
