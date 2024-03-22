import React from "react";
import Image from "next/image";

type Props = {
  source?: string;
  name?: string;
  id?: number;
};

const ImageDisplay = ({ source, name, id }: Props) => {
  const getImagePath = (imagePath?: string, fullSize?: boolean) => {
    return imagePath
      ? `http://image.tmdb.org/t/p/${
          fullSize ? "original" : "w500"
        }/${imagePath}`
      : "https://links.papareact.com/o8z";
  };

  return (
    <div>
      <Image
        className="w-fit lg:min-w-[400px] h-56 object-cover object-center shadow-md shadow-gray-900 drop-shadow-xl rounded-sm"
        src={getImagePath(source)}
        alt={name || ""}
        width={1920}
        height={1080}
        key={id}
      />
    </div>
  );
};

export default ImageDisplay;
