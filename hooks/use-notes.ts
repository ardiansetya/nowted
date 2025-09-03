import { api } from "@/lib/axios";
import { Notes } from "@/types/notes";
import { useQuery } from "@tanstack/react-query";


 export const fetchAllNotes = async () => {
    try {
        const response = await api.get<Notes[]>("/notes");
        return response.data;
    } catch (error) {
        console.log(error);
    }
 }
 export const fetchNotesByFolderId = async (folderId: number) => {
    try {
        const response = await api.get<Notes[]>(`/notes?folderId=${folderId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
 }

 export const useGetNotesByFolderId = (folderId: number) => {
    return useQuery({
        queryKey: ['notes', folderId],
        queryFn: () => fetchNotesByFolderId(folderId),
    })
}