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
		default:
			return state;
	}
};
