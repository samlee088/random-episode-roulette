"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import React from "react";

import { Button } from "@/components/ui/button";
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

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
});

const SaveAs = () => {
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

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(`${data.saveAsTitle}`);

    form.reset();
  }

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
