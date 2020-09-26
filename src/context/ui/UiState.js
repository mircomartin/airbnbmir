import React, { useReducer } from 'react';
import { types } from '../../types/types';

//Context
import { UiContext } from './UiContext';
import uiReducer from './uiReducer';


export const UiState = (props) => {

	const initialState = {
		alert: false,
	};

	const [state, dispatch] = useReducer(uiReducer, initialState);

	const showAlert = () => {

		dispatch({
			type: types.alertShow,
		})

	}

	const hideAlert = () => {

		dispatch({
			type: types.hideAlert,
		})

	}
	
	return (
		<UiContext.Provider
			value={{
				alert: state.alert,
				showAlert,
				hideAlert,
			}}
		>
			{props.children}
		</UiContext.Provider>
	);
};
