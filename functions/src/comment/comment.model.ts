// @ts-ignore
import { ItemType } from '../shared/item-type.enum';

export interface AppComment {
  type: ItemType;
  by: string;
  id: number;
  kids: number[];
  parent: number;
  text: string;
  time: number;
  deleted?: boolean;
  subComments?: AppComment[];
  subCommentCount?: number;
}
