import parse from "url-parse";
import makeRequest from "./helperConnect";
import querystring from "querystring";
import {
  API_URL,
  ACCESSKEY,
  API_VERSION,
  SECRETKEY,
  REDIRECT_URI,
  OAUTH_TOKEN_URL,
  OAUTH_AUTHORIZE_URL
} from "./constants";

const options = {
  method: "GET",
  headers: {
    "Accept-Version": API_VERSION,
    Authorization: `Client-ID ${ACCESSKEY}`,
    "Content-Type": "application/json",
    Accept: "application/json"
  }
};

let querystrings = querystring.stringify({
  client_id: ACCESSKEY,
  redirect_uri: REDIRECT_URI,
  response_type: "code",
  scope: ["public+read_user+write_likes+read_collections"]
});

const baseRequest = (i = 1) => {
  const request = `${API_URL}/photos/?page=${i}`;
  return makeRequest(request, options);
};

const photoRequest = id => {
  const request = `${API_URL}/photos/${id}`;
  return makeRequest(request, options);
};

const download = id => {
  const request = `${API_URL}/photos/${id}/download`;
  return makeRequest(request, options);
};

const searcher = (keyword = "") => {
  const request = `${API_URL}/search/photos`;
  const searchOptions = { ...options, query: keyword };
  return makeRequest(request, searchOptions);
};

export { baseRequest, photoRequest, download, searcher };
