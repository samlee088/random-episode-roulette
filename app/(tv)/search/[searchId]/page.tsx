import ImageDisplay from "@/components/ImageDisplay";
import { getSearchedMovies } from "@/lib/getTV";
import { notFound } from "next/navigation";
import React from "react";
import Link from "next/link";
import TVListDisplay from "@/components/TVListDisplay";

type Props = {
  params: {
    searchId: string;
  };
};
async function SearchPage({ params: { searchId } }: Props) {
  if (!searchId) notFound();

  const searchTerm = decodeURI(searchId);

  const televisionShows = await getSearchedMovies(searchTerm);

  return (
    <div>
      {!televisionShows.length ? (
        <div className="flex justify-center items-center my-64">
          <h1>
            No results found for that search term. Please try again with a
            different search.
          </h1>
        </div>
      ) : (
        <TVListDisplay shows={televisionShows} />
      )}
    </div>
  );
}

export default SearchPage;
