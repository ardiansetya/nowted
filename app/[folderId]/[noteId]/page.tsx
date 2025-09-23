"use client"

import React from 'react'
import FolderPage from '../page'
import NotePages from '@/components/note-pages'
import { useParams } from 'next/navigation'

const EditNotes = () => {
    
    const { noteId, folderId } = useParams() as {folderId: string, noteId: string };

  return (
    <div className='flex'>
        <FolderPage noteId={noteId} params={{folderId: folderId}} />
        <NotePages noteId={noteId} />
    </div>
  )
}

export default EditNotes