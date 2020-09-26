import React, { useState, useContext, useEffect } from 'react';

//Firebase
import { firebase } from './../firebase/firebase-config';

//Router
import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';

//Components
import { AuthRouter } from './AuthRouter';
import { Dashboard } from './Dashboard';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { Navbar } from '../components/layout/Navbar';
import { Spinner } from '../components/layout/Spinner';

//Context
import { types } from '../types/types';
import { AuthContext } from '../context/auth/AuthContext';

export const AppRouter = () => {
	const { dispatch, startCurrentProfile } = useContext(AuthContext);

	const [checking, setChecking] = useState(true);
	const [isloggedin, setIsloggedin] = useState(false);

	useEffect(() => {
		firebase.auth().onAuthStateChanged((user) => {

			if (user?.uid) {
				
				startCurrentProfile(user.uid)
				
				const { uid, displayName } = user;

				setIsloggedin(true);

				dispatch({
					type: types.login,
					payload: { uid, displayName },
				});

			} else {
				setIsloggedin(false);
			}
			setChecking(false);

		});
		// eslint-disable-next-line
	}, [setChecking, setIsloggedin]);
	
	return (
		<Router>
			<Navbar />
			{checking ? (
				<Spinner />
			) : (
				<main className="main">
					<Switch>
						<PublicRoute
							path="/auth"
							isAuthenticated={isloggedin}
							component={AuthRouter}
						/>

						<PrivateRoute
							path="/"
							isAuthenticated={isloggedin}
							component={Dashboard}
						/>

						<Redirect to="/auth/login" />
					</Switch>
				</main>
			)}
		</Router>
	);
};
