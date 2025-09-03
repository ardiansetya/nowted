import { api } from "@/lib/axios";
import { FolderSchema } from "@/lib/validation";
import { Folder } from "@/types/folders";
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

 const fetchAllFolders = async () => {
  try {
    const response = await api.get<Folder[]>("/folders");
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const createFolder = async (payload : Folder) => {
    try {
        const response = await api.post("/folders", payload);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const deleteFolder = async (id : number) => {
    try {
        const response = await api.delete(`/folders/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const fetchFolderById = async (id : number) => {
    try {
        const response = await api.get<Folder>(`/folders/${id}`);
        return response.data

    } catch (error) {
        console.log(error);
    }
}

export const useGetAllFolders = () => {
    return useQuery({
        queryKey: ['folders'],
        queryFn: fetchAllFolders,
    })
}

export const useGetFolderById = (id : number) => {
    return useQuery({
        queryKey: ['folders', id],
        queryFn: () => fetchFolderById(id),
    })
}


export const useCreateFolder = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (folderData: FolderSchema) => createFolder(folderData as Folder),

        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['folders'] })
          }
    })
}

export const useDeleteFolder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: number) => deleteFolder(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['folders'] })
          }
    })
}