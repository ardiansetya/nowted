import React, { useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "./ui/form";
import { Input } from "./ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useGetAllFolders } from "@/hooks/use-folders";
import { Check, ChevronsUpDown, Plus } from "lucide-react";
import { noteSchema, NoteSchema } from "@/lib/validation";
import { useCreateNote } from "@/hooks/use-notes";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "./ui/command";
import { cn } from "@/lib/utils";
import { Folder } from "@/types/folders";

const ModalAddNote = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openCombo, setOpenCombo] = useState(false);
  const {data: folders} = useGetAllFolders();

  const dateNow = new Date().toISOString();

  const form = useForm<NoteSchema>({
    resolver: zodResolver(noteSchema),
    defaultValues: { title: "", content: "Create Your Content", createdAt: dateNow },
  });

  const mutation = useCreateNote();

  const onSubmit = (noteValues: NoteSchema) => {
    console.log(noteValues);
    mutation.mutate(noteValues);
    form.reset();
    setOpenModal(false);
  };

  return (
    <Dialog open={openModal} onOpenChange={setOpenModal}>
      <DialogTrigger asChild>
        <Button variant="default" size="default" className="mt-3 w-full">
          <Plus />
          New Note
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Your Note</DialogTitle>
          <DialogDescription>
            Enter the title of your new Note below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="grid w-full max-w-sm items-center gap-2 mb-4">
                  <FormLabel htmlFor="title">Note Title</FormLabel>
                  <FormControl>
                    <Input id="title" placeholder="title" {...field} />
                  </FormControl>
                  <p className="text-sm text-red-400">
                    {form.formState.errors.title?.message}
                  </p>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="folderId"
              render={({ field }) => (
                <FormItem className="grid w-full max-w-sm items-center gap-2 mb-4">
                  <FormLabel htmlFor="folderId">Folder Name</FormLabel>
                  <FormControl>
                    <Popover open={openCombo} onOpenChange={setOpenCombo}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={openCombo}
                          className="w-[200px] justify-between">
                          {field.value
                            ? folders?.folders.find(
                                (folder: Folder) => folder.id === field.value
                              )?.name
                            : "Select Folder..."}
                          <ChevronsUpDown className="opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-[200px] p-0">
                        <Command>
                          <CommandInput
                            placeholder="Search folder..."
                            className="h-9"
                          />
                          <CommandList>
                            <CommandEmpty>No folder found.</CommandEmpty>
                            <CommandGroup>
                              {folders?.folders.map((folder: Folder) => (
                                <CommandItem
                                  key={folder.id}
                                  value={folder.id.toString()} 
                                  onSelect={(currentValue) => {
                                    field.onChange(String(currentValue)); 
                                    setOpenCombo(false);
                                  }}>
                                  {folder.name}
                                  <Check
                                    className={cn(
                                      "ml-auto",
                                      field.value === folder.id
                                        ? "opacity-100"
                                        : "opacity-0"
                                    )}
                                  />
                                </CommandItem>
                              ))}
                            </CommandGroup>
                          </CommandList>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <p className="text-sm text-red-400">
                    {form.formState.errors.folderId?.message}
                  </p>
                </FormItem>
              )}
            />

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit">
                {mutation.isPending ? "loading..." : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalAddNote;
