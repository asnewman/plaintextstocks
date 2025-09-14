export const pipe = <T>(...fns: Array<(arg: any) => any>) =>
  (initialValue: T): any =>
    fns.reduce((acc, fn) => fn(acc), initialValue);