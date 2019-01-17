import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
 import authReducer from '../reducers/auth';
 import pushNoticationReducer from '../reducers/push_notification';
 import gameReducer from '../reducers/game';



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// Store creation
export default () =>{
    const store = createStore(
        combineReducers({
            auth: authReducer,
            push: pushNoticationReducer,
            game: gameReducer
        }),
        composeEnhancers(applyMiddleware(thunk))
        // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
      );
      return store;
};
