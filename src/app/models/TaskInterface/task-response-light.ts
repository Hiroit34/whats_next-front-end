
import { iCategory } from "../CategoryInterface/category";
import { UserResponseLight } from "../user-response-light";

export interface iTaskResponseLight {
  id: number;
  title: string;
  description: string;
  status: string;
  category: iCategory;
  users: UserResponseLight[];
}
