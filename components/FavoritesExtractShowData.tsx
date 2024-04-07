import { grabFavoriteTitleRef } from "@/lib/converters/Preferences";
import { getDocs } from "firebase/firestore";
import React from "react";
import FavoritesShowExtractApi from "./FavoritesShowExtractApi";

interface Props {
  preferencesId: string;
}

async function FavoritesExtractShowData({ preferencesId }: Props) {
  let data = (await getDocs(grabFavoriteTitleRef(preferencesId))).docs.map(
    (doc) => ({ ...doc.data(), preferencesId: preferencesId })
  );

  return (
    <div>
      {data.map((data) => (
        <div key={data.preferencesId}>
          <FavoritesShowExtractApi data={data} />
        </div>
      ))}
    </div>
  );
}

export default FavoritesExtractShowData;
