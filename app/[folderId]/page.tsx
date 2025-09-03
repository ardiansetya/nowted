import NotesData from "@/components/notes-data";
import NotesFolder from "@/components/notes-folder";
import { useGetFolderById } from "@/hooks/use-folders";

const UrlPage = async ({ params }: { params: Promise<{ folderId: number }> }) => {
  const { folderId } = await params;
  console.log(folderId);


 
  return (
    <section className="w-1/4 bg-primary-foreground min-h-screen px-4 ">
      <div className="py-6">
        <NotesFolder folderId={folderId} />
      </div>
      <NotesData folderId={folderId} />
    </section>
  );
};

export default UrlPage;
