import { publicProcedure, router } from "./trpc";


export const appRouter = router({
    getNotes: publicProcedure.query(async () => {
        return [{ id: 1, title: "Note 1", content:'bla bla bla', createdAt: new Date().toISOString(), folderId: "1" }]
    }),
    getFolder: publicProcedure.query(async () => {
        return [{ id: 1, name: "Personal" }]
    })
})

export type AppRouter = typeof appRouter