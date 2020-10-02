import React, { useContext, useEffect, useState } from 'react';

//Context
import { InmueblesContext } from '../../context/inmuebles/InmueblesContext';
import { UiContext } from '../../context/ui/UiContext';

//Components
import { Pagination } from '../layout/Pagination';
import { Spinner } from '../layout/Spinner';
import { InmuebleCardPublic } from './InmuebleCardPublic';

export const Inmuebles = () => {
	const { inmuebles, startListAllProperties } = useContext(InmueblesContext);
	const { loading } = useContext(UiContext);

	const [currentPage, setCurrentPage] = useState(1);
	const [postsPerPage] = useState(6);

	// Get current posts
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = inmuebles.slice(indexOfFirstPost, indexOfLastPost);

	// Change page
	const paginate = (pageNumber) => setCurrentPage(pageNumber);

	useEffect(() => {
		startListAllProperties();
		// eslint-disable-next-line
	}, []);

	if (loading) return <Spinner />;

	return (
		<div className="container inmuebles">
			<div className="row">
				{currentPosts.map((inmueble) => (
					<InmuebleCardPublic key={inmueble.id} inmueble={inmueble} />
				))}
			</div>
			{inmuebles.length >= 6 && (
					<div className="row justify-content-center align-content-center my-5">
						<Pagination
							postsPerPage={postsPerPage}
							totalPosts={inmuebles.length}
							paginate={paginate}
						/>
					</div>
				)}
		</div>
	);
};
