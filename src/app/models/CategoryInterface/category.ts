import { iTaskWithIdTitle } from "../TaskInterface/task-with-id-title"


export interface iCategory {
  id: number,
  categoryType: String,
  description: String
  task: iTaskWithIdTitle[]
}
