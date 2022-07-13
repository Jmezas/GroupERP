export abstract class BaseInfrastructure<T, U> {
  insert(user: T): Promise<T> {
    return Promise.resolve(user);
  }
  update(user: T): Promise<T> {
    throw new Error("Method not implemented.");
  }
  delete(id: U): Promise<T> {
    throw new Error("Method not implemented.");
  }
  findById(id: U): Promise<T> {
    throw new Error("Method not implemented.");
  }
  findAll(where: { [s: string]: string | number | boolean },order:{[s:string]:string}): Promise<T[]> {
    return Promise.resolve([
      { username: "user" },
      { username: "user 2" },
    ] as any[]);
  }
}
