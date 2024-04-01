"use client";

import React from "react";
import { Button } from "./ui/button";
import { MinusIcon, PlusIcon, Star } from "lucide-react";
import { usePathname } from "next/navigation";
import { useShowDataStore } from "@/store/store";

import {
  Drawer,
  DrawerClose,
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
  const [showData, setShowData] = useShowDataStore((state) => [
    state.showData,
    state.setShowData,
  ]);

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
            <DrawerContent className="bg-stone-950 text-inherit">
              <div className="mx-auto w-full max-w-sm min-h-96">
                <DrawerHeader>
                  <DrawerTitle>Save</DrawerTitle>
                  <DrawerDescription>
                    Save the current Seasons and Episode Selected
                  </DrawerDescription>
                </DrawerHeader>
                <div className="p-4 pb-0">
                  <div className="flex items-center justify-center space-x-2">
                    <SaveAs />
                  </div>
                </div>
                <DrawerFooter>
                 
                 
                </DrawerFooter>
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
