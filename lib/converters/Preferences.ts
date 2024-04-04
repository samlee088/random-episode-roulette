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

export interface PreferencesTitle {
  preferencesTitle: string;
  showId: string;
}

const preferencesTitleConverter: FirestoreDataConverter<PreferencesTitle> = {
  toFirestore: function (title: PreferencesTitle): DocumentData {
    return {
      preferencesTitle: title.preferencesTitle,
      showId: title.showId,
    };
  },
  fromFirestore: function (
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): PreferencesTitle {
    const data = snapshot.data(options);

    return {
      preferencesTitle: data.preferencesTitle,
      showId: data.showId,
    };
  },
};

export const addPreferencesRef = (preferencesId: string, userId: string) =>
  doc(db, "preferences", preferencesId, "owner", userId).withConverter(
    settingsOwnerConverter
  );

export const addPreferencesTitleRef = (preferencesId: string) =>
  collection(db, "preferences", preferencesId, "title").withConverter(
    preferencesTitleConverter
  );

export const grabFavoriteTitleRef = (preferencesId: string) =>
  query(addPreferencesTitleRef(preferencesId));
