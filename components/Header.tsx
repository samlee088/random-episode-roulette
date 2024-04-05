import Link from "next/link";
import DarkModeToggle from "./DarkModeToggle";
import { Heart, Sparkles, Tv } from "lucide-react";
import { SearchBar } from "./SearchBar";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import UserButton from "./UserButton";
import SavePreferences from "./SavePreferences";
import HeaderFavoritesLink from "./HeaderFavoritesLink";

async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900">
      <nav className="flex flex-col sm:flex-row items-center p-5 pl-2 bg-white dark:bg-gray-900 max-w-full mx-48 ">
        <div className="flex-1 flex items-center space-x-8">
          <Link href={"/"} prefetch={false}>
            <div className="flex items-center justify-center space-x-1">
              <Tv />
              <div>Home</div>
            </div>
          </Link>
          <Link href={"/popularShows"} prefetch={false}>
            <div className="flex items-center justify-center space-x-1">
              <Sparkles />
              <div>Popular Shows</div>
            </div>
          </Link>
          <div className="flex w-full max-w-sm items-center space-x-2">
            <SearchBar />
          </div>
        </div>
        <div className="flex-1 flex items-center justify-end space-x-8">
          {session ? (
            <>
              <SavePreferences />
              <HeaderFavoritesLink />
            </>
          ) : (
            ""
          )}
          <UserButton session={session} />
          <DarkModeToggle />
        </div>
      </nav>
    </header>
  );
}

export default Header;
