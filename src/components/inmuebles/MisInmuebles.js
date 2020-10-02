import React, { useContext, useEffect } from 'react';

//Context
import { InmueblesContext } from '../../context/inmuebles/InmueblesContext';
import { AuthContext } from '../../context/auth/AuthContext';
import { UiContext } from '../../context/ui/UiContext';

//Component
import { InmuebleCard } from './InmuebleCard';
import { Spinner } from '../layout/Spinner';

export const MisInmuebles = () => {
	const { user } = useContext(AuthContext);
	const { inmuebles, startListMyProperties } = useContext(InmueblesContext);
	const { loading } = useContext(UiContext);

	useEffect(() => {
		startListMyProperties(user.uid);
		// eslint-disable-next-line
	}, [user.uid]);

	return (
		<div className="container inmuebles">
			<h2 className="inmuebles__title">Your properties</h2>
			{loading ? (
				<Spinner />
			) : (
				<div className="row">
					{inmuebles.map((inmueble) => (
						<InmuebleCard key={inmueble.id} inmueble={inmueble} />
					))}
				</div>
			)}
		</div>
	);
};
