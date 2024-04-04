import { getSingularTVShowSummary } from "@/lib/getTV";
import React from "react";
import FavoritesCard from "./FavoritesCard";

type Props = {
  preferencesTitle: string;
  showId: string;
};
async function FavoritesShowExtractApi({ data }: { data: Props }) {
  let apiCall = await getSingularTVShowSummary({
    series_id: Number(data.showId),
  });

  return (
    <div>
      <FavoritesCard
        preferencesTitle={data.preferencesTitle}
        favoritesShowData={apiCall}
      />
    </div>
  );
}

export default FavoritesShowExtractApi;
