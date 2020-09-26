import React, { useReducer } from 'react';

//Firebase
import {db, firebase} from './../../firebase/firebase-config'


//Context
import { types } from '../../types/types';
import inmuebleReducer from './inmuebleReducer';
import { InmueblesContext } from './InmueblesContext';

//Components
import { fileUpload } from '../../helpers/fileUpload';
import { createKeyword } from '../../helpers/keywords';
import { loadMyProperties } from '../../helpers/loadInmuebles';


export const InmueblesState = (props) => {

	const initialState = {
		inmuebles: [],
	};

	const [state, dispatch] = useReducer(inmuebleReducer, initialState);

	//Agregar Inmueble
	const startAddProperty = async (user, property) => {
		try {

			if (property.file) {
				const url = await fileUpload(property.file)
				property.file = url
			}

			const textoBusqueda = `${property.address} ${property.city} ${property.country}`
            const keywords = createKeyword(textoBusqueda)
    
            const newInmueble = {
                user,
                ...property,
                keywords
            }

			const { id } = await db.collection('Properties').add(newInmueble)

			dispatch({
				type: types.addInmueble,
				payload: {id, newInmueble}
			})
		} catch (error) {
			console.log(error.message)
		}
	}

	//Mis Inmuebles
	const startListMyProperties = async (uid) => {
		try {
			const resp = await loadMyProperties(uid)

			dispatch({
				type: types.setInmuebles,
				payload: resp,
			})
			
		} catch (error) {
			console.log(error.message)
		}
	}
	
	return (
		<InmueblesContext.Provider
			value={{
				inmuebles: state.inmuebles,
				startAddProperty,
				startListMyProperties

			}}
		>
			{props.children}
		</InmueblesContext.Provider>
	);
};
