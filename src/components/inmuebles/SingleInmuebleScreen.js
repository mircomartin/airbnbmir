import React, { useContext, useEffect } from 'react';

//Router
import { useParams } from 'react-router-dom';

//Context
import { InmueblesContext } from '../../context/inmuebles/InmueblesContext';
import { UiContext } from '../../context/ui/UiContext';

//Components
import { Spinner } from '../layout/Spinner';

export const SingleInmuebleScreen = () => {
	const { loading } = useContext(UiContext);
	const { active, startActiveProperty } = useContext(InmueblesContext);

	const { id } = useParams();

	useEffect(() => {
		startActiveProperty(id);
		// eslint-disable-next-line
	}, [id]);

    const { file, price, address, title, city, country, description, user } = active;
	
	if (loading) return <Spinner/>

	return (
		<div className="container single">
			<div className="row">
				<div className="col-12 mb-5">
					<h1 className="single__title">{title}</h1>
					<p className="single__subtitle">
						{city}, {country}
					</p>
					<figure className="text-center">
						{file ? (
							<img
								src={file}
								className="single__img img-fluid"
								alt={title}
							/>
						) : (
							<img
								src="/assets/img/sinimagen.png"
								className="single__img img-fluid"
								alt="Property"
							/>
						)}
					</figure>
				</div>
				<div className="col-12">
					<h2 className="single__address">{address}</h2>
					<p className="single__description">
						<i className="fas fa-home"></i>
						{description}
					</p>
					<p className="single__price">
						<span>${price} </span>/night
					</p>
                    <h3 className="single__contact">
						Contact
					</h3>
                    <p className="single__contactDetails"><i className="fas fa-at"></i> {user?.email}</p>
				</div>
			</div>
		</div>
	);
};
