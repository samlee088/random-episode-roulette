import { db } from "@/firebase";

import {
  DocumentData,
  FirestoreDataConverter,
  QueryDocumentSnapshot,
  SnapshotOptions,
  collection,
  collectionGroup,
  doc,
  query,
  where,
} from "firebase/firestore";

interface SettingsOwner {
  userId: string;
  email: string;
  timestamp: Date | null;
  preferencesId: string;
}

const settingsOwnerConverter: FirestoreDataConverter<SettingsOwner> = {
  toFirestore: function (owner: SettingsOwner): DocumentData {
    return {
      userId: owner.userId,
      email: owner.email,
      timestamp: owner.timestamp,
      preferencesId: owner.preferencesId,
    };
  },
  fromFirestore: function (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): SettingsOwner {
    const data = snapshot.data(options);

    return {
      userId: snapshot.id,
      email: data.email,
      timestamp: data.timestamp,
      preferencesId: data.preferencesId,
    };
  },
};

export const addPreferencesRef = (preferencesId: string, userId: string) =>
  doc(db, "preferences", preferencesId, "owner", userId).withConverter(
    settingsOwnerConverter
  );
