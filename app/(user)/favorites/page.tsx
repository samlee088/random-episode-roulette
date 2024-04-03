import { showFavoritesSavedRef } from "@/lib/converters/ShowData";
import { getDocs } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import React from "react";
import FavoritesCardDisplay from "@/components/FavoritesCardDisplay";

async function FavoritesPage() {
  const session = await getServerSession(authOptions);
  // const { data: session } = useSession();
  if (!session?.user.id) return;

  const userFavoritesData = await getDocs(
    showFavoritesSavedRef(session?.user.id)
  );

  const favoritesList = userFavoritesData.docs.map((doc) => ({
    ...doc.data(),
  }));

  console.log(favoritesList);
  return <FavoritesCardDisplay favoritesData={favoritesList} />;
}

export default FavoritesPage;
