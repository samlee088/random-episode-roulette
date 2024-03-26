import { SelectedEpisode } from "@/type";
import { create } from "zustand";

interface ShowData {
  showData: {
    seasonName: string;
    seasonEpisodes: SelectedEpisode[];
    seasonStatus: boolean;
  }[];
  setShowData: (
    data: {
      seasonName: string;
      seasonEpisodes: SelectedEpisode[];
      seasonStatus: boolean;
    }[]
  ) => void;
}

export const useShowDataStore = create<ShowData>()((set, get) => ({
  showData: [],
  setShowData: (data) => set({ showData: data }),
}));

interface SeasonSelection {
  seasonSelection: number;
  setSeasonSelection: (seasonSelection: number) => void;
}

export const useSeasonStore = create<SeasonSelection>()((set, get) => ({
  seasonSelection: 0,
  setSeasonSelection: (seasonSelection) =>
    set({ seasonSelection: seasonSelection }),
}));

interface EpisodeSelection {
  episodeSelection: number;
  setEpisodeSelection: (episodeSelection: number) => void;
}

export const useEpisodeStore = create<EpisodeSelection>()((set, get) => ({
  episodeSelection: 0,
  setEpisodeSelection: (episodeSelection) =>
    set({ episodeSelection: episodeSelection }),
}));

interface RadioSelection {
  radioSelection: string;
  setRadioSelection: (updatedRadioSelection: string) => void;
}

export const useRadioSelection = create<RadioSelection>()((set, get) => ({
  radioSelection: "compact",
  setRadioSelection: (updatedRadioSelection) =>
    set({ radioSelection: updatedRadioSelection }),
}));
