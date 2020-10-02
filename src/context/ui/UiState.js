import React, { useReducer } from 'react';
import { types } from '../../types/types';

//Context
import { UiContext } from './UiContext';
import uiReducer from './uiReducer';


export const UiState = (props) => {

	const initialState = {
		alert: false,
		loading: false,
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

	const startLoading = () => {

		dispatch({
			type:types.startLoading
		})

	}

	const finishLoading = () => {

		dispatch({
			type:types.finishLoading
		})

	}
	
	return (
		<UiContext.Provider
			value={{
				alert: state.alert,
				loading: state.loading,
				showAlert,
				hideAlert,
				startLoading,
				finishLoading,
			}}
		>
			{props.children}
		</UiContext.Provider>
	);
};
