import { PopularShows } from "@/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import ImageDisplay from "./ImageDisplay";

function TVListDisplay({ shows }: { shows: PopularShows[] }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(min(400px, 100%), 1fr))",
        alignItems: "start",
        rowGap: "36px",
        justifyItems: "center",
        justifyContent: "center",
      }}
    >
      {shows.map((televisionShow) => (
        <Link
          href={`/selectedShow/${televisionShow.id}`}
          key={televisionShow.id}
        >
          <div className="flex flex-col  justify-center items-center text-center my-10">
            <ImageDisplay
              source={
                televisionShow.backdrop_path || televisionShow.poster_path
              }
              name={televisionShow.name}
              id={televisionShow.id}
            />
            <h1 className="my-10 font-black text-4xl">{televisionShow.name}</h1>
            <p>{televisionShow.overview}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default TVListDisplay;
