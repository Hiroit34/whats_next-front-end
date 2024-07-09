import { iCategoryLight } from './category-light';
export interface iTask {

  id?: number;
  title?: string;
  description?: string;
  category?: iCategoryLight;
  userIds?: number[];
  status?: string;
  isShared?: boolean;
  isDeleted?: boolean;

}
