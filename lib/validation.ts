import {z} from "zod";

export const folderSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }).max(50, { message: "Name must be less than 50 characters" }),
});

export type FolderSchema = z.infer<typeof folderSchema>;

export const noteSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }).max(50, { message: "Title must be less than 50 characters" }),
    content: z.string().min(1, { message: "Content is required" }),
    folderId: z.string().min(1, { message: "Folder is required" }),
    createdAt: z.string().min(1, { message: "Date is required" }),
   
});

export type NoteSchema = z.infer<typeof noteSchema>;