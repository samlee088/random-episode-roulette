"use client";

import React from "react";
import { Button } from "./ui/button";
import { Star } from "lucide-react";
import { usePathname } from "next/navigation";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import SaveAs from "./SaveAs";

const SavePreferences = () => {
  const pathName = usePathname();
  const isSelectedPage = pathName.includes("/selectedShow");

  async function saveCurrentPreferences() {}
  return (
    <div>
      {isSelectedPage ? (
        <>
          <Drawer>
            <DrawerTrigger asChild>
              <Button onClick={saveCurrentPreferences}>
                <Star className="mr-1" /> Save
              </Button>
            </DrawerTrigger>
            <DrawerContent className="bg-stone-950 text-inherit flex justify-center items-center text-center">
              <div className="mx-auto w-full max-w-sm min-h-96">
                <DrawerHeader className="flex flex-col justify-center items-center ">
                  <DrawerTitle>Add Selection</DrawerTitle>
                  <DrawerDescription>
                    <span className="text-center flex">
                      Save the currently selected Season(s) and Episode(s)
                    </span>
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0">
                  <SaveAs />
                </div>
                <DrawerFooter></DrawerFooter>
              </div>
            </DrawerContent>
          </Drawer>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default SavePreferences;
