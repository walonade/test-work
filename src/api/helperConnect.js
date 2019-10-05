export default (url, options) => {
  return fetch(url, options).then(response => {
    if (response.status !== 200) {
      return response.text().then(text => {
        throw new Error(text);
      });
    }
    return response.json();
  });
};
