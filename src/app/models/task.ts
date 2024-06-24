import { iUser } from './user';
export interface iTask {

  id: number,
  title: string,
  description: string,
  status: string,
  users: iUser[]

}
