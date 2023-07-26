import * as types from '../actions/types'

const initialState = {
	isLoading: false,
}

export default function authReducer(state = initialState, action) {
	switch (action.type) {
		case types.TRIGGER_LOADER: {
			return {
				...state,
				isLoading: action.value
			}
		}
		default:
			return state
	}
}
