import { z } from "zod"

export const taskSchema = z.object({
  user_id: z.string(),
  full_name: z.string(),
  photo_url: z.string(),
  phone_number: z.string(),
  role: z.string(),
})

export type Task = z.infer<typeof taskSchema>