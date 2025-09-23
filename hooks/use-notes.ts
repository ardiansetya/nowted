import { api } from "@/lib/axios";
import { NoteSchema } from "@/lib/validation";
import { Notes } from "@/types/notes";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


 export const fetchAllNotes = async () => {
    try {
        const response = await api.get("/notes");
        return response.data;
    } catch (error) {
        console.log(error);
    }
 }
 export const fetchNotesByFolderId = async (folderId: string) => {
    try {
        const response = await api.get(`/notes/folder/${folderId}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
 }
 
 export const fetchNotesById = async (id: string) => {
    try {
        const response = await api.get(`/notes/${id}`);
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

 export const deleteNote = async (id: string) => {
    try {
        const response = await api.delete(`/notes/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
 }

 export const updateStarNote = async (id: string, isStarred: boolean) => {
    try {
        const response = await api.patch(`/notes/${id}`, { isStarred });
        return response.data;
    } catch (error) {
        console.log(error);
    }
 }


//  TANSTACK QUERY

export const useGetAllNotes = () => {
    return useQuery({
        queryKey: ['notes'],
        queryFn: fetchAllNotes,
    })
}


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

export const useGetNotesById = (id : string) => {
    return useQuery({
        queryKey: ['notes', id],
        queryFn: () => fetchNotesById(id),
    })
}

export const useUpdateStarNote = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ id, isStarred }: { id: string; isStarred: boolean }) => {
        return updateStarNote(id, isStarred);
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["notes"] });
      },
    });
}