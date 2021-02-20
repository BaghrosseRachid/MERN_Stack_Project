import {createStore, applyMiddleware} from 'redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
//create combione root reducer
import rootReducer from './reducers';
//create variable initiale state
const initialState = {};
//create the middleware
const middleWare = [thunk];
// create our store
const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleWare))
      );

export default store ;

