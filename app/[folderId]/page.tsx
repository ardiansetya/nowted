"use client";

import NotesData from "@/components/notes-data";
import NotesFolder from "@/components/notes-folder";
import { useGetFolderById } from "@/hooks/use-folders";
import { useParams } from "next/navigation";

const FolderPage = ({ params }: { params: { folderId: string } }) => {
  const { folderId } = useParams();
  console.log(folderId);

  // Type guard untuk memastikan folderId adalah string
  const folderIdString = Array.isArray(folderId) ? folderId[0] : folderId;

  // Selalu panggil hook, tapi disable query jika folderId tidak valid
  const {
    data: folder,
    isLoading,
    error,
  } = useGetFolderById(folderIdString || "");

  // Jika folderId undefined atau tidak valid
  if (!folderIdString) {
    return (
      <section className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Invalid Folder
          </h2>
          <p className="text-muted-foreground">
            Folder ID is missing or invalid.
          </p>
        </div>
      </section>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <section className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading folder...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-foreground mb-2">
            Error Loading Folder
          </h2>
          <p className="text-muted-foreground mb-4">
            {error.message || "Something went wrong"}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90">
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="flex">
      <div className="w-1/4 bg-primary-foreground min-h-screen px-4">
        <div className="py-6">
          <NotesFolder folderId={folderIdString} />
        </div>
        <NotesData folderId={folderIdString} />
      </div>

      <div className="w-full bg-primary-foreground min-h-screen px-4 border-l py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {folder?.name || "Notes"}
          </h1>
        </div>

        {/* Anda bisa menambahkan konten notes di sini */}
        <div className="text-muted-foreground">Folder ID: {folderIdString}</div>
      </div>
    </section>
  );
};

export default FolderPage;
