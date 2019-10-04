import photoStore from "./photo";
import * as connect from "~api";
import { observable, computed, action } from "mobx";
class RootStore {
  @observable photos = [];
  constructor() {
    this.connect = connect;
    this.photo = new photoStore(this);
    this.api = connect.baseRequest();
    this.count = 0;
  }

  @action firstLoading() {
    this.count = this.count + 1;
    return new Promise((resolve, reject) => {
      this.connect.baseRequest(this.count).then(data => {
        this.photos = [...this.photos, ...data];
      });
    });
  }
  @action searchPhoto(photo) {
        return this.connect.searcher(photo).then(data => {
          console.log(data);
        })
  }
}
export default new RootStore();
