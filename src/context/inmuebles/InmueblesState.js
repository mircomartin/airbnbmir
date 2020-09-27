import React, { useReducer, useContext } from 'react';

//Firebase
import {db, firebase} from './../../firebase/firebase-config'


//Context
import { types } from '../../types/types';
import inmuebleReducer from './inmuebleReducer';
import { InmueblesContext } from './InmueblesContext';
import { UiContext } from '../ui/UiContext';

//Components
import { fileUpload } from '../../helpers/fileUpload';
import { createKeyword } from '../../helpers/keywords';
import { loadInmuebleActive, loadMyProperties } from '../../helpers/loadInmuebles';
import Swal from 'sweetalert2';


export const InmueblesState = (props) => {
	const { startLoading, finishLoading } = useContext(UiContext)

	const initialState = {
		inmuebles: [],
		active: {},
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
		startLoading()
		try {
			
			const resp = await loadMyProperties(uid)

			dispatch({
				type: types.setInmuebles,
				payload: resp,
			})

			finishLoading()
		} catch (error) {
			finishLoading()
			console.log(error.message)
		}
	}

	//Inmueble seleccionado
	const startActiveProperty = async (id) => {
		try {

			const resp = await loadInmuebleActive(id)
			
			dispatch({
				type:types.activeInmueble,
				payload: resp,
			})

		} catch (error) {
			console.log(error.message)
		}
	}
	
	//Update
	const startUpdateProperty = async (id, property) => {
		try {

			if(property.file === Object) {
				const url = await fileUpload(property.file)
				property.file = url
			}

			const textoBusqueda = `${property.address} ${property.city} ${property.country}`
			const keywords = createKeyword(textoBusqueda)
			
			if(!property.id){
				delete property.id
			}

			const propertyToFirebase = {
				id,
				...property,
				keywords,
			}

			await db.collection('Properties').doc(id).update(propertyToFirebase)

			dispatch({
				type: types.editInmueble,
				payload: propertyToFirebase
			})
			
			Swal.fire('Success', 'Your property was updated', 'success')
		} catch (error) {
			console.log(error.message)
		}
	}

	return (
		<InmueblesContext.Provider
			value={{
				inmuebles: state.inmuebles,
				active: state.active,
				startAddProperty,
				startListMyProperties,
				startActiveProperty,
				startUpdateProperty,

			}}
		>
			{props.children}
		</InmueblesContext.Provider>
	);
};
