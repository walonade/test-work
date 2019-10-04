import React from "react";
import withStore from "~hocs/withStore";
import "./style.less";
import { Waypoint } from "react-waypoint";
import Masonry from "react-masonry-component";
import ItemPhoto from "~com/ItemPhoto";
import { masonryOptions } from "~help/config";

export default withStore(props => {
  let hasItem = [];
  const loadMoreItems = () => {
    props.store.firstLoading();
  };
  let photos = props.store.photos.map((item, i) => {
    let instagram = item.user.instagram_username;
    if (!hasItem.includes(item.id)) {
      hasItem.push(item.id);
      return (
        <ItemPhoto
          key={item.id}
          alt={item.description}
          img={item.urls.small}
          userAvatar={item.user.profile_image.medium}
          instagram={item.user.instagram_username}
          userName={item.user.name}
          id={item.id}
          download={props.store.photo.optimizeDownloadImage[i]}
        />
      );
    }
  });
  return (
    <>
      <Masonry className={"gallery-class"} options={masonryOptions}>
        {photos}
      </Masonry>
      <Waypoint onEnter={loadMoreItems} bottomOffset="-500px" />
    </>
  );
});
