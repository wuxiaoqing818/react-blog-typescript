import { action, makeAutoObservable } from 'mobx';

class UserStore {
  count: number = 1;
  constructor() {
    makeAutoObservable(this)
  }

  @action
  setCount = (): void => {
    this.count++;
  }
}
export default new UserStore();