import { useGetNotesById } from '@/hooks/use-notes';
import React from 'react'

const NotePages = ({noteId}: { noteId: string}) => {

    const {data: noteData} = useGetNotesById(noteId);
     console.log(noteData);


  return (
    <div className='p-6  w-full'>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground mb-2">
          {noteData?.title || "Note Title"}
        </h1>
        <p className="text-sm text-muted-foreground">{noteData?.content}</p>
      </div>
    </div>
  );
}

export default NotePages