import TVListDisplay from "@/components/TVListDisplay";
import { getPopularTVShows } from "@/lib/getTV";
import React from "react";

async function PopularShows() {
  const popularTVShows = await getPopularTVShows();

  return (
    <div>
      <TVListDisplay shows={popularTVShows} />
    </div>
  );
}

export default PopularShows;
