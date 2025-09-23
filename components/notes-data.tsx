"use client";

import { useGetNotesByFolderId } from "@/hooks/use-notes";
import { Notes } from "@/types/notes";
import { useRouter } from "next/navigation";

const NotesData = ({ folderId }: { folderId: string }) => {
  const { data: dataNotes } = useGetNotesByFolderId(folderId);
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4">
      {dataNotes?.notes?.map((note: Notes) => (
        <div
          onClick={() => {
            router.push(`/${folderId}/${note.id}`);
          }}
          key={note.id}
          className="p-6 bg-accent hover:bg-accent/50 hover:transition-all rounded-xl">
          <h3 className="text-lg font-semibold capitalize">{note.title}</h3>
          <p className="text-sm truncate text-muted-foreground">
            {note.createdAt} <span className="ms-4">{note.content}</span>
          </p>
        </div>
      ))}
    </div>
  );
};

export default NotesData;
