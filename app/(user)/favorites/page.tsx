import { showFavoritesSavedRef } from "@/lib/converters/ShowData";
import { getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import React from "react";
import FavoritesExtractShowData from "@/components/FavoritesExtractShowData";

async function FavoritesPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user.id) return;

  const userFavoritesData = await getDocs(
    showFavoritesSavedRef(session?.user.id)
  );

  const favoritesList = userFavoritesData.docs.map((doc) => ({
    preferencesId: doc.data().preferencesId,
  }));

  return (
    <div>
      {favoritesList.map((favorite) => (
        <FavoritesExtractShowData
          key={favorite.preferencesId}
          preferencesId={favorite.preferencesId}
        />
      ))}
    </div>
  );
}

export default FavoritesPage;
