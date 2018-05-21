import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import env from './config/envSelector';
import rootReducer from './Reducers';

const configureStore = () => {
  const store: any =
    env().name === 'dev'
      ? createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))
      : createStore(rootReducer);

  return store;
};

export default configureStore;
