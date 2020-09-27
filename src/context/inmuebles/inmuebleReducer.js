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
		case types.activeInmueble:
			return {
				...state,
				active: action.payload,
			};
		case types.editInmueble:
			return {
				...state,
				inmuebles: state.inmuebles.map((inmueble) =>
					inmueble.id === action.payload.id
						? action.payload
						: inmueble,
				),
			};
		default:
			return state;
	}
};
