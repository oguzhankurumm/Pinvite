import ReduxThunk from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './rootReducer';

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;
