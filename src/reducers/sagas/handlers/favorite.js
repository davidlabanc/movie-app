import { put } from "redux-saga/effects";
import { setFavorite, setError } from "../../slices/content/contentSlice";

export function* handleAddToFavorite(action) {
  const item = action.payload

  try {
    const newFavorite = { Poster: item.Poster, Title: item.Title, Year: item.Year, imdbID: item.imdbID }
    let currentFavorite = null

    if (localStorage.getItem('favorite') !== null) {
      currentFavorite =  JSON.parse(localStorage.getItem('favorite')) 
    }

    if (Array.isArray(currentFavorite)) {

      const index = currentFavorite.findIndex( (favorite) => favorite['imdbID'] === newFavorite.imdbID)

      if (index<0) {
        currentFavorite.push(newFavorite)
      }else{
        currentFavorite.splice(index, 1);
      }
    }else{
      currentFavorite = [newFavorite]
    }

    try {
      localStorage.setItem("favorite", JSON.stringify(currentFavorite))

      yield put(setFavorite(currentFavorite ));
    } catch (error) {
      yield put(setError());
    }
  } catch (error) {
    yield put(setError());
  }
}
