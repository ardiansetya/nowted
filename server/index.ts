import { publicProcedure, router } from "./trpc";


export const appRouter = router({
    getNotes: publicProcedure.query(async () => {
        return [{ id: 1, title: "Note 1", content:'bla bla bla' }, { id: 2, title: "Note 2", content:'bli bli bli' }];
    })
})

export type AppRouter = typeof appRouter