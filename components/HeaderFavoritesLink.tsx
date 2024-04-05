"use client";
import React from "react";
import Link from "next/link";
import { revalidatePath } from "next/cache";
import { Heart } from "lucide-react";
import action from "@/app/actions";

const HeaderFavoritesLink = () => {
  return (
    <div>
      <Link href={"/favorites"} prefetch={false} onClick={action}>
        <div className="flex items-center justify-center space-x-1">
          <Heart />
          <div>Favorites</div>
        </div>
      </Link>
    </div>
  );
};

export default HeaderFavoritesLink;
