import { combineReducers } from 'redux';
import authReducer from './auth/reducer';
import loadingReducer from './loading/reducer';
import userReducer from './user/reducer';

const reducers = combineReducers({
	auth: authReducer,
	user: userReducer,
	loading: loadingReducer,
});

export default reducers;

