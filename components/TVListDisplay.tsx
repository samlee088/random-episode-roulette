"use client";
import { PopularShows } from "@/type";
import React from "react";

function TVListDisplay({ shows }: { shows: PopularShows[] }) {
  return (
    <div>
      {shows.map((televisionShow) => (
        <p key={televisionShow.id}>{televisionShow.overview}</p>
      ))}
    </div>
  );
}

export default TVListDisplay;
