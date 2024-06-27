import { iCategory } from "./category";
import { UserResponseLight } from "./user-response-light";

export interface iTaskResponseLight {
  id: number;
  name: string;
  description: string;
  status: string;
  category: iCategory;
  users: UserResponseLight[];
}
