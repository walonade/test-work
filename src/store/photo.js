import { observable, computed, action, runInAction } from "mobx";

export default class {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.connect = this.rootStore.connect;
    this.id = null;
    this.storage = sessionStorage;
  }

  @observable photo = [];

  @action getPhoto(id) {
    return this.connect.photoRequest(id).then(data => {
      this.photo = data;
    });
  }

  downloadImage(id) {
    const filename = id;
    this.connect.download(id).then(res => {
 console.log(res);
    });
  }

  @computed get optimizeDownloadImage() {
    return this.rootStore.photos.map(photo => {
      return () => this.downloadImage(photo.id);
    });
  }
}
