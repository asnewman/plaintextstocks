export const asyncPipe = <T>(...fns: Array<(arg: any) => Promise<any> | any>) =>
  async (initialValue: T): Promise<any> =>
    fns.reduce(async (acc, fn) => fn(await acc), Promise.resolve(initialValue));