import React from "react";
import "./style.less";
import withStore from "~hocs/withStore";
import Slider from "react-slick";
import { routesMap } from "~r";
import LinkButton from "~com/LinkButton";
import pathHelper from "~help/pathHelper.js";
import history from "~/history";
import { sliderSettings } from "~help/config";
import { Link, withRouter } from "react-router-dom";

class Header extends React.Component {
  constructor(props) {
    super();
    this.state = {
      visible: true,
      focus: false,
      value: ""
    };
  }
  componentDidMount() {
    window.addEventListener("scroll", this.scroollHeader);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) {
      this.props.location.pathname !== "/"
        ? this.setState({
            visible: false
          })
        : this.setState({
            visible: true
          });
    }
  }
  scroollHeader = () => {
    if (window.scrollY > 50) this.setState({ visible: false });
    if (window.scrollY < 50) this.setState({ visible: true });
    if (this.props.location.pathname !== "/") this.setState({ visible: false });
  };
  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
    if (this.props.location.pathname !== "/") {
      this.setState({
        visible: true
      });
    }
  };
  formControl = event => {
    this.setState({
      value: event.target.value
    });
  };
  formSubmit = event => {
    event.preventDefault();
    this.search(this.state.value);
  };
  search = (text) => {
    this.props.store.searchPhoto(text);
  }
  focus = () => {
    this.setState({
      focus: true
    });
  };
  blur = () => {
    if (this.state.value === "") {
      this.setState({
        focus: false
      });
    }
  };
  render() {
    let { visible, value, focus } = this.state;
    const style = {
      maxHeight: "20px",
      position: "fixed",
      padding: "10px 10px 20px 10px"
    };
    return (
      <header className="header" style={!visible ? style : null}>
        <div className="container">
          <LinkButton to={routesMap.home} className="logo">
            <img src={pathHelper("Vector.svg")} alt="logo" />
            <span>ImageStock</span>
          </LinkButton>
          <div className="menu">
            {!visible ? (
              <div className="search-top" onClick={this.scrollToTop}>
                <img src={pathHelper("search.svg")} />
                <span>Поиск</span>
              </div>
            ) : null}
            <LinkButton to={routesMap.favorites} className="favorites">
              <img src={pathHelper("favorite.svg")} alt="favorites" />
              <span>Избранное</span>
            </LinkButton>
            <div className="history">
              <img src={pathHelper("history.png")} alt="history" />
              <span>История поиска</span>
            </div>
          </div>
          <div className="search">
            <form onSubmit={this.formSubmit}>
              {!focus ? <span>Поиск</span> : null}
              <input
                onChange={this.formControl}
                value={value}
                onFocus={this.focus}
                onBlur={this.blur}
              />
              <div className="input-gradient"></div>
            </form>
            <div className="slider">
              <div className="slider-gradient"></div>
              <Slider {...sliderSettings}>
                {history.map((item, i) => (
                  <p onClick={() => this.search(item.toString())} key={i}>{item}</p>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default withStore(withRouter(Header));
