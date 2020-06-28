import { ItemType } from './item-type.enum';

export abstract class Item {
  readonly type: ItemType;

  protected constructor(public id: number,
                        public by: string,
                        public time: number,
                        public kids: number[]) {
  }

}
