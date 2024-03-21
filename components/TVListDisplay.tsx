import { PopularShows } from "@/type";
import Image from "next/image";
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
      }}
    >
      {shows.map((televisionShow) => (
        <div
          key={televisionShow.id}
          className="flex justify-center items-center text-center my-36 "
        >
          <div className="flex flex-col">
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
            <p>{televisionShow.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TVListDisplay;
