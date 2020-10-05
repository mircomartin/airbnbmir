import React from 'react';

export const Footer = () => {
	return (
		<footer>
			<div className="container">
				<div className="row justify-content-between align-items-center no-gutters footer">
					<div className="col-12 col-md-auto mb-3 mb-md-0 text-center">
						<p className="footer__firma">© 2020 <a href="https://mmdiseno.netlify.app/" target="_blank" rel="noopener noreferrer">MM Developer</a>, Inc. All rights reserved</p>
					</div>
					<div className="col-12 col-md-auto text-center">
                        <a className="footer__enlaceIcono" href="https://www.facebook.com/mircocmartin/" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
						<a className="footer__enlaceIcono" href="https://www.linkedin.com/in/mirco-martin-a3b70670/" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
						<a className="footer__enlaceIcono" href="https://www.instagram.com/mirco_martin/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                    </div>
				</div>
			</div>
		</footer>
	);
};
