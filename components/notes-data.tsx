'use client'

import { useGetNotesByFolderId } from '@/hooks/use-notes';
import React from 'react'

const NotesData = ({folderId}: {folderId: number}) => {
    const {data:dataNotes} = useGetNotesByFolderId(folderId);
  return (
    <div className='flex flex-col gap-4'>
      {dataNotes?.map((note) => (
        <div key={note.id} className="p-6 bg-accent hover:bg-accent/50 hover:transition-all rounded-xl">
          <h3 className="text-lg font-semibold capitalize">{note.title}</h3>
          <p className="text-sm truncate">
            {note.content}
          </p>
        </div>
      ))}
    </div>
  );
}

export default NotesData