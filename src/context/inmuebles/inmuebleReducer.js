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
				active: {},
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
					inmueble.id === action.payload.id ? action.payload : inmueble,
				),
			};
		case types.deletedInmueble:
			return {
				...state,
				inmuebles: state.inmuebles.filter(
					(inmueble) => inmueble.id === action.payload,
				),
				active: {},
			};
		default:
			return state;
	}
};
