"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";

const ToastDestructive = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => {
  const { toast } = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => {
        toast({
          variant: "destructive",
          title: title,
          description: description,
          action: <ToastAction altText="Go Back">Try again</ToastAction>,
        });
      }}
    >
      Show Toast
    </Button>
  );
};

export default ToastDestructive;
