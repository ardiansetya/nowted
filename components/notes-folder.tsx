'use client'

import { useGetFolderById } from "@/hooks/use-folders";

const NotesFolder = ({ folderId }: { folderId: number }) => {
 
  const {data: folderData} = useGetFolderById(folderId);
  

  return (
    <div>
      <h3 className="text-2xl font-semibold capitalize">{folderData?.name}</h3>
    </div>
  );
};

export default NotesFolder;
