"use client";

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
import { Button } from "./ui/button";
import { useDeleteFolder } from "@/hooks/use-folders";
import { Trash2Icon } from "lucide-react";

const AlertDelete = ({ productId }: { productId: number }) => {
  const mutation = useDeleteFolder();
  const handleDelete = (productId: number) => {
    mutation.mutate(productId);
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant={"ghost"} size="icon">
          <Trash2Icon className=" text-red-500 hover:text-red-700" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            Your folder and notes will be deleted permanently. This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete(productId)}
            className="bg-destructive text-white shadow-xs hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60">
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDelete;
