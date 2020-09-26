import { types } from '../../types/types';

export default (state, action) => {
	switch (action.type) {
		case types.addInmueble:
			return {
				...state,
				inmuebles: [...state.inmuebles, action.payload],
			};
		case types.setInmuebles:
			return {
				...state,
				inmuebles: action.payload,
			};
		default:
			return state;
	}
};
