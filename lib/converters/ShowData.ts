import { db } from "@/firebase";
import { SelectedEpisode } from "@/type";

import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  collection,
  collectionGroup,
  doc,
  orderBy,
  query,
  where,
} from "firebase/firestore";

interface ShowData {
  id?: string;
  showData: {
    seasonName: string;
    seasonEpisodes: SelectedEpisode[];
    seasonStatus: boolean;
  }[];
}

const showDataSettingsConverter: FirestoreDataConverter<ShowData> = {
  toFirestore: function (showData: ShowData): DocumentData {
    return {
      showData: showData.showData,
    };
  },
  fromFirestore: function (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): ShowData {
    const data = snapshot.data(options);

    return {
      id: snapshot.id,
      showData: data.showData,
    };
  },
};

export const showDataRef = (preferencesId: string) =>
  collection(db, "preferences", preferencesId, "showData").withConverter(
    showDataSettingsConverter
  );

export const showFavoritesSavedRef = (userId: string) =>
  query(
    collectionGroup(db, "owner"),
    where("userId", "==", userId),
    orderBy("timestamp", "asc")
  ).withConverter(showDataSettingsConverter);
