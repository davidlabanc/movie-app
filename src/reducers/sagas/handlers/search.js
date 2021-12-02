import { call, put } from "redux-saga/effects";
import { setSearchContent } from "../../slices/search/searchSlice";
import { requestSearch } from "../requests/search";

export function* handleSearch(action) {
  try {
    const response = yield call(requestSearch, action.payload.term);
    const { data } = response;
    yield put(setSearchContent({ ...data }));
  } catch (error) {
    console.log(error)
  }
}
