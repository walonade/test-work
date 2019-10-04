import React from "react";
import LinkButton from "~com/LinkButton";
import pathHelper from "~help/pathHelper.js";
import { urlBuilder } from "~r";
import "./style.less";

const ItemPhoto = props => (
  <div className="element-class">
    <a>
      <img alt={props.alt} src={props.img} />
    </a>
    <div className="description">
      <div className="author-info">
        <img
          src={props.userAvatar}
          alt={props.userName}
          className="profile-img"
        />
        <h3>{props.userName}</h3>
        <span>{props.instagram !== null ? `@${props.instagram}` : ""}</span>
      </div>
      <div className="action-block">
        <img src={pathHelper("favorite.svg")} alt="like" />
        <LinkButton to={urlBuilder("photo", { id: props.id })}>
          <img src={pathHelper("maximize.svg")} alt="maximize" />
        </LinkButton>
        <img
          onClick={props.download}
          src={pathHelper("download.svg")}
          alt="download"
        />
      </div>
    </div>
  </div>
);

const optimization = (prevProps, nextProps) => {
  if (prevProps.id === nextProps.id) {
    return true;
  }
  return false;
};

export default React.memo(ItemPhoto, optimization);
