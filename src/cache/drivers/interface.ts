export default interface Cache {
  get(key: string): Promise<unknown>;
  set(key: string, value: unknown, timeInSecond: number): Promise<boolean>;
}
