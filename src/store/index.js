import photoStore from "./photo";
import * as connect from "~api";
import { observable, computed, action } from "mobx";
class RootStore {
  @observable photos = [];
  @observable searchPhotos = {};
  constructor() {
    this.connect = connect;
    this.photo = new photoStore(this);
    this.api = connect.baseRequest();
    this.count = 0;
    this.searchCount = 0;
  }

  @action firstLoading() {
    this.count = this.count + 1;
    return new Promise((resolve, reject) => {
      this.connect.baseRequest(this.count).then(data => {
        this.photos = [...this.photos, ...data];
      });
    });
  }
  @action searchPhoto(photo, i) {
    this.searchCount = this.searchCount + 1
    return new Promise((resolve, reject) => {
      this.connect.searcher(photo, this.searchCount).then(data => {
        this.searchPhotos = {...this.searchPhotos, ...data};
        console.log(this.searchPhotos);
      });
    });
  }
}
export default new RootStore();
