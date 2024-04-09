"use client";
import SelectedShowDisplay from "@/components/SelectedShowDisplay";
import { getSingleTVShowData } from "@/lib/getTV";
import retrieveData from "@/lib/retrieveData";
import { useSelectedFavoriteStatus } from "@/store/store";
import { SelectedEpisode } from "@/type";
import React, { useEffect, useState } from "react";
import { useMemo } from "react";

type Props = {
  params: {
    showId: number;
  };
};

function SelectedShow({ params: { showId } }: Props) {
  const [selectedFavoriteStatus, setSelectedFavoriteStatus] =
    useSelectedFavoriteStatus((store) => [
      store.selectedFavoriteStatus,
      store.setSelectedFavoriteStatus,
    ]);

  const [singleShowSeasonsEpisodesData, setSingleShowSeasonsEpisodesData] =
    useState<
      {
        seasonName: string;
        seasonEpisodes: SelectedEpisode[];
        seasonStatus: boolean;
      }[]
    >([]);

  useEffect(() => {
    renderPage();
  }, [showId]);

  async function renderPage() {
    if (selectedFavoriteStatus) {
    } else {
      const data = await retrieveData({ showId: showId });
      setSingleShowSeasonsEpisodesData(data);
    }
  }

  const memoizedData = useMemo(
    () => singleShowSeasonsEpisodesData,
    [singleShowSeasonsEpisodesData]
  );

  return (
    <div>
      {memoizedData.length ? (
        <SelectedShowDisplay showDataParent={singleShowSeasonsEpisodesData} />
      ) : (
        <div className="flex justify-center align-center">Loading</div>
      )}
    </div>
  );
}

export default SelectedShow;
