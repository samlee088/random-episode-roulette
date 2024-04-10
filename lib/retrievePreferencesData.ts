"use server";

import { getDocs } from "firebase/firestore";
import { showDataRef } from "./converters/ShowData";
import { SelectedEpisode } from "@/type";

async function retrievePreferencesData({
  preferencesId,
}: {
  preferencesId: string;
}) {
  const querySnapshot = await getDocs(showDataRef(preferencesId));

  const data: {
    seasonName: string;
    seasonEpisodes: SelectedEpisode[];
    seasonStatus: boolean;
  }[] = querySnapshot.docs.flatMap((doc) => doc.data().showData);

  return data;
}

export default retrievePreferencesData;
