import { api } from "@/lib/axios";
import { NoteSchema } from "@/lib/validation";
import { Notes } from "@/types/notes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


 export const fetchAllNotes = async () => {
    try {
        const response = await api.get<Notes[]>("/notes");
        return response.data;
    } catch (error) {
        console.log(error);
    }
 }
 export const fetchNotesByFolderId = async (folderId: string) => {
    try {
        const response = await api.get<Notes[]>(`/notes?folderId=${folderId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
 }


 export const createNote = async (payload: Notes) => {
    try {
        const response = await api.post("/notes", payload);
        return response.data;
    } catch (error) {
        console.log(error);
    }
 }


//  TANSTACK QUERY
 export const useGetNotesByFolderId = (folderId: string) => {
    return useQuery({
        queryKey: ['notes', folderId],
        queryFn: () => fetchNotesByFolderId(folderId),
    })
}

export const useCreateNote = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (noteData: NoteSchema) => createNote(noteData as Notes),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] })
        }
    })
}