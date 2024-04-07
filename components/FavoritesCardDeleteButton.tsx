import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "./ui/toast";
import action from "@/app/actions";
const FavoritesCardDeleteButton = ({
  preferencesId,
}: {
  preferencesId: string;
}) => {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);

  async function deleteFavoritesData() {
    await fetch("/api/preferences/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ preferencesId: preferencesId }),
    })
      .then((res) => {
        toast({
          variant: "default",
          title: "Delete Successful",
          description: "This set of preferences was successfully deleted",
          action: <ToastAction altText="Go Back">Close</ToastAction>,
        });
        action();
      })
      .catch((error) => {
        toast({
          variant: "destructive",
          title: "Unable to delete",
          description: "This set of preferences was not deleted",
          action: <ToastAction altText="Go Back">Close</ToastAction>,
          className: "bg-red-800",
        });
        console.error(error);
      })
      .finally(() => {
        setOpen(false);
      });
  }
  return (
    <div>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">Delete</Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Are you sure you want to delete this record?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete this
              favorites preferences and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={deleteFavoritesData}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default FavoritesCardDeleteButton;
