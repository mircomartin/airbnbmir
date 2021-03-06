import React from 'react';
import { useHistory } from 'react-router-dom';

export const InmuebleCardPublic = ({ inmueble }) => {
	const { id, city, title, price, country, file, likes } = inmueble;

	const history = useHistory();

	const handleRedirect = () => {
		history.push(`/properties/${id}`);
	};

	return (
		<div className="col-12 col-md-4">
			<figure className="inmuebles__wrapperImg">
				{!file ? (
					<img
						src="/assets/img/sinimagen.png"
						className="img-fluid inmuebles__img"
						alt="Sin Imagen"
					/>
				) : (
					<img src={file} className="img-fluid inmuebles__img" alt={title} />
				)}
			</figure>
			<div className="inmuebles__wrapperBody" onClick={handleRedirect}>
				<p className="inmuebles__bodyCity">
					{city}, {country}
				</p>
				<h3 className="inmuebles__bodyTitle">{title}</h3>
				<div className="d-flex justify-content-between align-items-center">
					<p className="inmuebles__bodyPrice">
						<span>${price}</span> per night
					</p>
					<p className="inmuebles__bodyIcono">
						<i className="far fa-thumbs-up"></i>
						<span>{likes}</span>
					</p>
				</div>
			</div>
		</div>
	);
};
