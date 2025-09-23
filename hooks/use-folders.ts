import { api } from "@/lib/axios";
import { FolderSchema } from "@/lib/validation";
import { Folder } from "@/types/folders";
import {  useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

 const fetchAllFolders = async () => {
  try {
    const response = await api.get("/folders");
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

const deleteFolder = async (id : string) => {
    try {
        const response = await api.delete(`/folders/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

const fetchFolderById = async (id : string) => {
    try {
        const response = await api.get(`/folders/${id}`);
        return response.data

    } catch (error) {
        console.log(error);
    }
}


// TANSTACK QUERY

export const useGetAllFolders = () => {
    return useQuery({
        queryKey: ['folders'],
        queryFn: fetchAllFolders,
    })
}

export const useGetFolderById = (id : string) => {
    return useQuery({
        queryKey: ['folders', id],
        queryFn: () => fetchFolderById(id),
    })
}


export const useCreateFolder = () =>{
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (folderData: FolderSchema) => createFolder(folderData as Folder),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['folders'] })
          }
    })
}

export const useDeleteFolder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => deleteFolder(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['folders'] })
          }
    })
}