import { action, observable } from "mobx";
import BaseStore from "./baseStore";

export class ModalStore extends BaseStore {
  @observable.shallow modal = {
    open: false,
    body: null,
  };

  @action Open = (content: any) => {
    console.log(content);
    this.modal = {
      open: true,
      body: content,
    };
  };

  @action Close = () => {
    this.modal = {
      open: false,
      body: null,
    };
  };
}
