import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import rootReducer from './root-reducer';


const middleWares = [logger]; //store loggers in an array bcos there might be need to update the list of loggers

const store = createStore(rootReducer, applyMiddleware(...middleWares));

export default store;