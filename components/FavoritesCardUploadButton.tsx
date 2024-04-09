import React from "react";
import { Button } from "./ui/button";

function FavoritesCardUploadButton({
  preferencesId,
}: {
  preferencesId: string;
}) {
  return (
    <div>
      <Button className="bg-green-300" variant="outline">
        Open
      </Button>
    </div>
  );
}

export default FavoritesCardUploadButton;
