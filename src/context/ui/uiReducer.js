import { types } from '../../types/types';

export default (state, action) => {
	switch (action.type) {
		case types.alertShow:
			return {
				...state,
				alert: true,
			};
		case types.alertHide:
			return {
				...state,
				alert: false,
			};
		case types.startLoading:
			return {
				...state,
				loading: true,
			};
		case types.finishLoading:
			return {
				...state,
				loading: false,
			};
		default:
			return state;
	}
};
