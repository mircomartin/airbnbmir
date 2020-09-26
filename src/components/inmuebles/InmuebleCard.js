import React from 'react';

export const InmuebleCard = ({ inmueble }) => {
	const { city, title, price, country, file } = inmueble;

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
					<img
						src={file}
						className="img-fluid inmuebles__img"
						alt={title}
					/>
				)}
			</figure>
			<div className="inmuebles__wrapperBody">
				<p className="inmuebles__bodyCity">
					{city}, {country}
				</p>
				<h3 className="inmuebles__bodyTitle">{title}</h3>
				<p className="inmuebles__bodyPrice">
					<span>${price}</span> per night
				</p>
			</div>
		</div>
	);
};
