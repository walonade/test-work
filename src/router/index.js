import MainPage from "~con/MainPage";
import PhotoPage from "~con/PhotoPage";
import FavoritesPage from "~con/FavoritesPage";
import Page404 from "~con/Page404";
import HistoryPage from "~con/HistoryPage";

let routes = [
  {
    name: "home",
    url: "/",
    component: MainPage,
    exact: true
  },
  {
    name: "history",
    url: "history/:some",
    component: HistoryPage,
    exact: true
  },
  {
    name: "favorites",
    url: "/favorites",
    component: FavoritesPage,
    exact: true
  },
  {
    name: "photo",
    url: "/photo/:id",
    component: PhotoPage,
    exact: true
  },
  {
    url: "**",
    component: Page404
  }
];

let routesMap = {};

routes.forEach(route => {
  if (route.hasOwnProperty("name")) {
    routesMap[route.name] = route.url;
  }
});

const urlBuilder = (name, params) => {
  if (!routesMap.hasOwnProperty(name)) {
    return null;
  }
  let url = routesMap[name]; // photo/:id
  for (let key in params) {
    url = url.replace(`:${key}`, params[key]);
  }
  return url;
};

export { routes, routesMap, urlBuilder };
