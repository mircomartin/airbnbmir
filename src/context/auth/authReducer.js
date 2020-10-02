import { types } from '../../types/types';

export default (state, action) => {
	switch (action.type) {
		case types.login:
			return {
				user: {
					uid: action.payload.uid,
					name: action.payload.displayName,
					email: action.payload.email,
				},
			};
		case types.activeUser:
			return {
				...state,
				activeUser: action.payload,
			};
		case types.logout:
			return {};
		default:
			return state;
	}
};
