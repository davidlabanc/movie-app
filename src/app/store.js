import {
  configureStore,
  combineReducers,
} from "@reduxjs/toolkit";

import contentSlice from '../reducers/slices/content/contentSlice'
import uiSlice from '../reducers/slices/ui/uiSlice'
import searchSlice from '../reducers/slices/search/searchSlice'

import createSagaMiddleware from "redux-saga";
import { watcherSaga } from "../reducers/sagas/rootSaga";

const sagaMiddleware = createSagaMiddleware();

const combinedReducer = combineReducers({
  contentSlice, uiSlice, searchSlice
});

const store = configureStore({
  reducer: combinedReducer,
  middleware: [sagaMiddleware]
});
sagaMiddleware.run(watcherSaga);


export default store;






  // import {
  //   configureStore,
  //   combineReducers,
  //   createStore
  // } from "@reduxjs/toolkit";
  
  // import contentSlice from '../reducers/slices/content/contentSlice'
  // import uiSlice from '../reducers/slices/ui/uiSlice'
  // import searchSlice from '../reducers/slices/search/searchSlice'
  
  // import createSagaMiddleware from "redux-saga";
  // import { watcherSaga } from "../reducers/sagas/rootSaga";
  
  // const sagaMiddleware = createSagaMiddleware();
  
  // const combinedReducer = combineReducers({
  //   contentSlice, uiSlice, searchSlice
  // });
  
  // const store = configureStore({
  //   reducer: combinedReducer,
  //   middleware: [sagaMiddleware]
  // });
  // sagaMiddleware.run(watcherSaga);
  
  
  // export default store;