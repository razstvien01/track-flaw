import { z } from "zod"

export const taskSchema = z.object({
  id: z.string(),
  name: z.string(),
  photo_url: z.string(),
  phone_number: z.string(),
})

export type Task = z.infer<typeof taskSchema>