import { z } from "zod"

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const taskSchema = z.object({
  bug_id: z.string(),
  bug_name: z.string(),
  bug_description: z.string(),
  status: z.string(),
  severity: z.string(),
  priority: z.string(),
})

export type Task = z.infer<typeof taskSchema>