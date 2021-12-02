import { call, put } from "redux-saga/effects";
import { setMovie, setError } from "../../slices/content/contentSlice";
import { requestGetMovie } from "../requests/movie";

export function* handleGetMovie(action) {
  try {
    const response = yield call(requestGetMovie, action.payload.id);
    const { data } = response;
    yield put(setMovie({ ...data }));
  } catch (error) {
    yield put(setError());
  }
}
