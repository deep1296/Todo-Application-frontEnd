import { createStore, applyMiddleware,combineReducers,compose } from 'redux';
import thunk from 'redux-thunk';
import { loginReducer } from './Login/reducer';
import { signupreducer } from './Signup/reducer';
import { todosReducer } from './Todos/reducer';


const composeEnhancers =
  typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?   
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
    }) : compose;
    
    const middleware = [thunk];

const enhancer = composeEnhancers(
  applyMiddleware(...middleware),
  // other store enhancers if any
);

const rootReducer = combineReducers({
    login:loginReducer,
    signup:signupreducer,
    todos:todosReducer
});


export const store = createStore(rootReducer, enhancer);