import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './reducers';

const initialState = {};

const store = createStore(
	reducers,
	initialState,
	composeWithDevTools(applyMiddleware(thunkMiddleware)),
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

