import { getSingularTVShowSummary } from "@/lib/getTV";
import React from "react";
import FavoritesCard from "./FavoritesCard";

type Props = {
  preferencesTitle: string;
  showId: string;
  preferencesId: string;
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
        preferencesId={data.preferencesId}
        showId={data.showId}
      />
    </div>
  );
}

export default FavoritesShowExtractApi;
