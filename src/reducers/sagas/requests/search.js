import axios from "axios";

export function requestSearch(param) {
  return axios.request({
    method: "get",
    url: `http://omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${param}`
  });
}
