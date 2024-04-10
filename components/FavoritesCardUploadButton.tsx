import React from "react";
import { Button } from "./ui/button";
import { useSelectedFavoriteStatus, useShowDataStore } from "@/store/store";
import retrievePreferencesData from "@/lib/retrievePreferencesData";
import { useRouter } from "next/navigation";
import retrieveData from "@/lib/retrieveData";

function FavoritesCardUploadButton({
  preferencesId,
  showId,
}: {
  preferencesId: string;
  showId: string;
}) {
  const [selectedFavoriteStatus, setSelectedFavoriteStatus] =
    useSelectedFavoriteStatus((store) => [
      store.selectedFavoriteStatus,
      store.setSelectedFavoriteStatus,
    ]);
  const router = useRouter();

  const [showData, setShowData] = useShowDataStore((state) => [
    state.showData,
    state.setShowData,
  ]);

  async function uploadSelectedFavoritePreferences() {
    setSelectedFavoriteStatus(true);
    let data = await retrievePreferencesData({ preferencesId: preferencesId });
    setShowData(data);

    router.push(`/selectedShow/${showId}`);
  }

  return (
    <div>
      <Button
        onClick={uploadSelectedFavoritePreferences}
        className="bg-green-300"
        variant="secondary"
      >
        Open
      </Button>
    </div>
  );
}

export default FavoritesCardUploadButton;
