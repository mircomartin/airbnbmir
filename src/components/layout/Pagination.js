import React from 'react';

export const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
	const pageNumbers = [];

	for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
		pageNumbers.push(i);
	}

	return (
		<nav className="col-auto">
			<ul className="pagination">
				{pageNumbers.map((number) => (
					<li key={number} className="pagination__item">
						<button onClick={() => paginate(number)} className="pagination__link">
							{number}
						</button>
					</li>
				))}
			</ul>
		</nav>
	);
};