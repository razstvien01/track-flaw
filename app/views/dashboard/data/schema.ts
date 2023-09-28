import { z } from "zod"

export const taskSchema = z.object({
  id: z.string(),
  name: z.string(),
  photo_url: z.string(),
  phone_number: z.string(),
})

export type Task = z.infer<typeof taskSchema>

// id: '1L89Gv7CMJeeThuJa9zh8x0rCSx2',
//     name: 'Nicolen Evanz T. Aricayos',
//     photo_url: 'https://lh3.googleusercontent.com/a/ACg8ocLuvtSTZeqwiV8dguCuHuB-JTFhLKNFnPjlgH2j9_MpNw=s96-c',
//     phone_number: '09953988031',