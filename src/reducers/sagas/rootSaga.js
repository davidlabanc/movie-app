import { takeEvery } from "redux-saga/effects";
import { handleGetMovie } from "./handlers/movie";
import { handleSearch } from "./handlers/search";
import { handleAddToFavorite } from './handlers/favorite'
import { getMovie, addToFavorite } from "../slices/content/contentSlice";
import { getSearchContent } from "../slices/search/searchSlice";

export function* watcherSaga() {
  yield takeEvery(getMovie.type, handleGetMovie)
  yield takeEvery(getSearchContent.type, handleSearch)
  yield takeEvery(addToFavorite.type, handleAddToFavorite)
}
