import { showFavoritesSavedRef } from "@/lib/converters/ShowData";
import { getDocs } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import React from "react";

async function FavoritesPage() {
  const session = await getServerSession(authOptions);
  // const { data: session } = useSession();
  if (!session?.user.id) return;

  const userFavoritesData = await getDocs(
    showFavoritesSavedRef(session?.user.id)
  );

  const initialFavorites = userFavoritesData.docs.map((doc) => ({
    ...doc.data(),
    timestamp: null,
  }));

  console.log(userFavoritesData);
  return <div></div>;
}

export default FavoritesPage;
