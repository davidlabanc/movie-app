import axios from "axios";

export const requestGetMovie = async(param) => {
  return axios.request({
    method: "get",
    url: `http://omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&i=${param}`
  });
}
