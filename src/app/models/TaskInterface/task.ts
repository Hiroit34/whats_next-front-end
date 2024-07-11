import { iCategoryWithTitleId } from "../CategoryInterface/category-with-title-id";

export interface iTask {

  id?: number;
  title?: string;
  description?: string;
  category?: iCategoryWithTitleId;
  userIds?: number[];
  status?: string;
  isShared?: boolean;
  isDeleted?: boolean;

}
