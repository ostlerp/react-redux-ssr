import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';
import DevTools from '../containers/DevTools/DevTools';

export let configureStore = function(initialState) {
  let finalCreateStore;

  if (process.env.NODE_ENV !== 'production') {
    finalCreateStore = compose(
      applyMiddleware(thunkMiddleware),
      (process.browser && window.devToolsExtension) ? window.devToolsExtension() : DevTools.instrument()
    )(createStore);
  } else {
    finalCreateStore = applyMiddleware(thunkMiddleware)(createStore);
  }

  const store = finalCreateStore(rootReducer, initialState);

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextRootReducer = require('../reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}
