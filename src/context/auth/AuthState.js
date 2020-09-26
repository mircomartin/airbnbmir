import React, { useReducer } from 'react';

//Context
import { AuthContext } from './AuthContext';
import authReducer from './authReducer';
import { types } from '../../types/types';

//Sweet Alert 2
import Swal from 'sweetalert2';

//Firebase
import { db, firebase } from './../../firebase/firebase-config'

//Components
import { fileUpload } from '../../helpers/fileUpload';

export const AuthState = (props) => {

	const initialState = {
		user: {},
		activeUser: {},
	};

	const [state, dispatch] = useReducer(authReducer, initialState);

	//Registro de nuevo Usuario
	const startRegisterEmailPassword = async (newUser) => {

		const { name, lastname,	birth, email, password } = newUser;
		try {
			
			const { user }= await firebase.auth().createUserWithEmailAndPassword(email, password)

			await user.updateProfile({displayName: name})
			
			const userToFirestore = { 
				uid: user.uid,
				firstname: name,
				lastname,	
				birth, 
				email,
				img: '',
				country: 'Country',
				city: 'City',
				description: 'Description about Example... Hobbies, Jobs',
				languajes: 'Languages you can speak',
			}

			db.collection('Usuarios').doc(user.uid).set(userToFirestore)

			const { uid, displayName } = user

			dispatch({
				type: types.login,
				payload: {
					uid,
					displayName
				}
			})

			dispatch({
				type: types.per,
				payload: {
					uid,
					displayName
				}
			})

		} catch (error) {
			console.log(error.message)
		}

	}

	//Login con Email
	const startLoginEmailPassword = async (email, password) => {
		try {

			const { user } = await firebase.auth().signInWithEmailAndPassword(email, password)
			const { uid, displayName } = user;

			dispatch({
				type: types.login,
				payload: {
					uid,
					displayName
				}
			})

		} catch (error) {
			console.log(error.message)
		}
	}

	//ObtenerPerfilActivo
	const startCurrentProfile = async (uid) => {
		try {

			const query = await db.collection('Usuarios').doc(uid).get()
			const resp = query.data()

			dispatch({
				type: types.activeUser,
				payload: resp,
			})

		} catch (error) {
			console.log(error.message)
		}
	}
	
	//Logout
	const startLogout = async () => {
		try {

			await firebase.auth().signOut()
			dispatch({
				type: types.logout
			})

		} catch (error) {
			console.log(error.message)
		}
	}

	//UpdateProfilePicture
	const startUpdateProfileImage = async (file, uid) => {
		try {

			Swal.fire({
				title: 'Uploading...',
				text: 'Please wait...',
				allowOutsideClick: false,
				onBeforeOpen: () => {
					Swal.showLoading();
				}
			});

			const img = await fileUpload(file)

			await db.collection('Usuarios').doc(uid).update({img: img})

			startCurrentProfile(uid)

			Swal.close();
		} catch (error) {
			console.log(error.message)
		}
	}

	return (
		<AuthContext.Provider
			value={{
				user: state.user,
				activeUser: state.activeUser,
				startRegisterEmailPassword,
				startLoginEmailPassword,
				startCurrentProfile,
				startLogout,
				startUpdateProfileImage,
				dispatch,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};
