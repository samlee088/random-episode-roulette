"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { DrawerClose } from "./ui/drawer";
import { useShowDataStore } from "@/store/store";
import { addDoc, serverTimestamp, setDoc } from "firebase/firestore";
import {
  addPreferencesRef,
  addPreferencesTitleRef,
} from "@/lib/converters/Preferences";
import { showDataRef } from "@/lib/converters/ShowData";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const SaveAs = () => {
  const { data: session } = useSession();
  const [showData, setShowData] = useShowDataStore((state) => [
    state.showData,
    state.setShowData,
  ]);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const FormSchema = z.object({
    saveAsTitle: z.string().min(1, {
      message: "Username must be at least 2 characters.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      saveAsTitle: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    console.log(`${data.saveAsTitle}`);

    if (!session?.user.id) return;

    const preferencesId = uuidv4();

    setLoading(true);

    await setDoc(addPreferencesRef(preferencesId, session.user.id), {
      userId: session.user.id!,
      email: session.user.email!,
      timestamp: serverTimestamp(),
      preferencesId: preferencesId,
    }).catch((error) => {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Save Unsuccessful",
        description:
          "Unable to save current season selections and episode selections to user's account",
        action: <ToastAction altText="Go Back">Close</ToastAction>,
        className: "bg-red-800",
      });
      form.reset();
      return;
    });

    await addDoc(addPreferencesTitleRef(preferencesId), {
      preferencesTitle: data.saveAsTitle,
    }).catch((error) => {
      console.error(error);
      toast({
        variant: "destructive",
        title: "Save Unsuccessful",
        description: "Unable to save title to preferences",
        action: <ToastAction altText="Go Back">Close</ToastAction>,
        className: "bg-red-800",
      });
      setLoading(false);
      form.reset();
      return;
    });

    await addDoc(showDataRef(preferencesId), {
      showData: showData,
    })
      .then(() => {
        toast({
          variant: "default",
          title: "Saving Preferences Successful!",
          description:
            "Current season selections and episode selections were added to user's account",
          action: <ToastAction altText="Go Back">Close</ToastAction>,
        });
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Save Unsuccessful",
          description: "Unable to save data preferences to account",
          action: <ToastAction altText="Go Back">Close</ToastAction>,
          className: "bg-red-800",
        });
      });

    setLoading(false);
    form.reset();
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="saveAsTitle"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Save As</FormLabel>
                <FormControl>
                  <Input placeholder="Save As..." {...field} />
                </FormControl>
                <FormDescription>Please enter a title</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <DrawerClose asChild>
            <Button type="submit">Submit</Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </form>
      </Form>
    </div>
  );
};

export default SaveAs;
