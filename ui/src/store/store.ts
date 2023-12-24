import { combineReducers, applyMiddleware, createStore, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { docReducer } from './doc/docReducer';

export const reducerAll = combineReducers({ doc: docReducer });
export type Store = ReturnType<typeof initStore>;

const initStore = () => {
    if (Object.keys(window).indexOf('__REDUX_DEVTOOLS_EXTENSION__') > 0) {
        return createStore(reducerAll, compose(composeWithDevTools()));
    } else {
        return createStore(reducerAll);
    }
};

export let store = initStore();

export const getStore = () => store;
