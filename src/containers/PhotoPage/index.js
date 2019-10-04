import React from "react";
import withStore from "~hocs/withStore";
import "regenerator-runtime/runtime";
import "./style.less";
import pathHelper from "~help/pathHelper.js";
import Masonry from "react-masonry-component";
import ItemPhoto from "~com/ItemPhoto";
import { masonryOptions } from "~help/config";

class PhotoPage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      isLoaded: false
    };
  }

  downloadImage = () => {
    const id = this.props.match.params.id;
    this.props.store.photo.downloadImage(id);
  };

  async componentDidMount() {
    await this.props.store.photo
      .getPhoto(this.props.match.params.id)
      .then(() => {
        this.setState({
          isLoaded: true
        });
      });
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.photo !== nextProps.store.photo.photo) {
      return {
        photo: nextProps.store.photo.photo
      };
    }
    return null;
  }
  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.setState({
        isLoaded: false
      });
      this.props.store.photo.getPhoto(this.props.match.params.id).then(() => {
        this.setState({
          isLoaded: true
        });
      });
    }
  }
  render() {
    const { photo } = this.state;
    return this.state.isLoaded ? (
      <>
        <div
          className="photo-container"
          style={{ backgroundImage: `url(${photo.urls.regular})` }}
        >
          <div className="container">
            <div className="description">
              <img
                src={photo.user.profile_image.medium}
                alt={photo.user.name}
                className="profile-img"
              />
              <div className="profile-info">
                <h2>{photo.user.name}</h2>
                <span>
                  {photo.user.instagram_username
                    ? `@${photo.user.instagram_username}`
                    : ""}
                </span>
              </div>
            </div>
            <div className="buttons">
              <button>
                <img src={pathHelper("favorite_gray.svg")} />
              </button>
              <button onClick={this.downloadImage}>
                <img src={pathHelper("download.svg")} />
                <span>Download</span>
              </button>
            </div>
            <img src={photo.urls.regular} className="central-photo" />
            <div className="tags-block">
              <span>Похожие тэги</span>
              <div className="tags">
                {photo.tags.map((item, i) => {
                  return <span key={i}>{item.title}</span>;
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="similar-photos container">
          <h2>Похожие фотографии</h2>
          <Masonry options={masonryOptions} className={"similar-block"}>
            {photo.related_collections.results.map((item, i) => {
              return (
                <ItemPhoto
                  key={item.id}
                  alt={item.cover_photo.description}
                  img={item.cover_photo.urls.small}
                  userAvatar={item.cover_photo.user.profile_image.medium}
                  instagram={item.cover_photo.user.instagram_username}
                  userName={item.cover_photo.user.name}
                  id={item.cover_photo.id}
                />
              );
            })}
          </Masonry>
        </div>
      </>
    ) : null;
  }
}
export default withStore(PhotoPage);
