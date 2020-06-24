export class User {
  constructor(public id: string,
              public delay: number,
              public created: number,
              public karma: number,
              public submitted: number[]) {
  }

  public static from(user: User): User {
    const { id, delay, created, karma, submitted } = user;

    return new User(id, delay, created, karma, submitted);
  }
}
