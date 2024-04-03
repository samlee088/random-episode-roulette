"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { showFavoritesSavedRef } from "@/lib/converters/ShowData";
import FavoritesCardDisplayRow from "./FavoritesCardDisplayRow";

interface Props {
  [x: string]: any;
}
const FavoritesCardDisplay = ({
  favoritesData,
}: {
  favoritesData: Props[];
}) => {
  const { data: session } = useSession();
  const [favorites, loading, error] = useCollectionData<Props>(
    session && showFavoritesSavedRef(session?.user.id!),
    {
      initialValue: favoritesData,
    }
  );
  return (
    <div>
      {favorites?.map((favorite) => (
        <FavoritesCardDisplayRow
          key={favorite.preferencesId}
          preferencesId={favorite.preferencesId}
        />
      ))}
    </div>
  );
};

export default FavoritesCardDisplay;
