import { PopularShows } from "@/type";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function TVListDisplay({ shows }: { shows: PopularShows[] }) {
  const getImagePath = (imagePath?: string, fullSize?: boolean) => {
    return imagePath
      ? `http://image.tmdb.org/t/p/${
          fullSize ? "original" : "w500"
        }/${imagePath}`
      : "https://links.papareact.com/o8z";
  };

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
            <Image
              className="w-fit lg:min-w-[400px] h-56 object-cover object-center shadow-md shadow-gray-900 drop-shadow-xl rounded-sm"
              src={getImagePath(
                televisionShow.backdrop_path || televisionShow.poster_path
              )}
              alt={televisionShow.name}
              width={1920}
              height={1080}
              key={televisionShow.id}
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
