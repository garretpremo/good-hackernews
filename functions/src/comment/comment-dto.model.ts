import { ItemType } from '../shared/item-type.enum';

export class CommentDtoModel {

  constructor(public type: ItemType,
              public by: string,
              public id: number,
              public kids: number[],
              public parent: number,
              public text: string,
              public time: number,
              public subComments: Comment[],
              public subCommentCount: number,
              public deleted = false) {
  }

}
