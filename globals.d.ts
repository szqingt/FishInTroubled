declare interface IAction<T> {
  type: string;
  playload: T;
}
