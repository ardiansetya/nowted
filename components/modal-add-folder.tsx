import React, { useState } from 'react'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from './ui/form';
import { Input } from './ui/input';
import { useForm } from 'react-hook-form';
import { FolderSchema, folderSchema } from '@/lib/validation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCreateFolder } from '@/hooks/use-folders';
import { FolderPlus } from 'lucide-react';


const ModalAddFolder = () => {
    const [open, setOpen] = useState(false);

    const form = useForm<FolderSchema>({
        resolver: zodResolver(folderSchema),
        defaultValues: { name: "" }
    });

    const mutation = useCreateFolder();

    const onSubmit = (FolderValues: FolderSchema) => {
        mutation.mutate(FolderValues);
        form.reset();
        setOpen(false);
    }


  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
            <FolderPlus/>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Your Folder</DialogTitle>
          <DialogDescription>
            Enter the name of your new folder below.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="grid w-full max-w-sm items-center gap-2 mb-4">
                  <FormLabel htmlFor="name">Folder Name</FormLabel>
                  <FormControl>
                    <Input id="name" placeholder="Name" {...field} />
                  </FormControl>
                  <p className="text-sm text-red-400">
                    {form.formState.errors.name?.message}
                  </p>
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
                <Button type="submit">{mutation.isPending ? "loading..." : "Create"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default ModalAddFolder