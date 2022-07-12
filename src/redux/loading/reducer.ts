import { AnyAction, Reducer } from 'redux';
import LoadingState from '../../types/loading/LoadingState';
import * as actionTypes from './actionType';

const initialState: LoadingState = {
	disable: false,
};

const loadingReducer: Reducer<LoadingState, AnyAction> = (state = initialState, action) => {
	const { type } = action;


	switch (type) {
	case actionTypes.LOADING_START:
		return {
			...state,
			disable: true,
		};
	case actionTypes.LOADING_END:
		return {
			...state,
			disable: false,
		};
	default:
		return state;
	}
};

export default loadingReducer;