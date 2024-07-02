import { iCategory } from './category';
export interface iTask {
  id?: number;
  title?: string;
  description?: string;
  category?: iCategory;
  userIds?: number[];
  status?: string;
  isShared?: boolean;
  isDeleted?: boolean;
}
