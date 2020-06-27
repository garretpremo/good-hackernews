export class User {
  constructor(public id: string,
              public delay: number,
              public created: number,
              public karma: number,
              public submitted: number[],
              public about?: string) {
  }

  public static from(user: User): User {
    const { id, delay, karma, submitted, about } = user;
    let created = user.created;

    if (created) {
      created = created * 1000;
    }

    return new User(id, delay, created, karma, submitted, about);
  }
}
