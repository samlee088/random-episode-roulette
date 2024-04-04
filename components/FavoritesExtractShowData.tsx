import { authOptions } from "@/auth";
import { grabFavoriteTitleRef } from "@/lib/converters/Preferences";
import { getSingularTVShowSummary } from "@/lib/getTV";
import { getDocs } from "firebase/firestore";
import { getServerSession } from "next-auth";
import React from "react";
import FavoritesShowExtractApi from "./FavoritesShowExtractApi";

interface Props {
  preferencesId: string;
}

async function FavoritesExtractShowData({ preferencesId }: Props) {
  let data = (await getDocs(grabFavoriteTitleRef(preferencesId))).docs.map(
    (doc) => doc.data()
  );

  console.log(data);

  return (
    <div>
      {data.map((data) => (
        <div key={data.preferencesTitle}>
          <FavoritesShowExtractApi data={data} />
        </div>
      ))}
    </div>
  );
}

export default FavoritesExtractShowData;
