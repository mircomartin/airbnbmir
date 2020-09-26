import React, { useContext } from 'react';

//Router
import { NavLink } from 'react-router-dom';

//Context
import { AuthContext } from '../../context/auth/AuthContext';

export const Navbar = () => {
	const { activeUser, startLogout } = useContext(AuthContext);

	const handleLogout = () => {
		startLogout();
	};

	return (
		<nav className="navbar">
			<div className="container">
				<div className="row justify-content-between align-items-center w-100 no-gutters">
					<figure className="col-auto">
						<img
							src="/assets/img/logo.png"
							className="img-fluid navbar__img"
							alt="brand"
						/>
					</figure>
					<div className="col-auto">
						<ul className="navbar__menuMain">
							<li>
								<span id="navbar" className="navbar__profile">
									<i className="fas fa-bars navbar__icono mr-2"></i>
									{!activeUser?.img ? (
										<i className="fas fa-user-circle navbar__icono"></i>
									) : (
										<img
											src={activeUser.img}
											className="navbar__imgProfile"
											alt="Profile"
										/>
									)}
								</span>
								{activeUser ? (
									<ul className="navbar__subMenu" id="submenu">
										<NavLink
											exact
											to="/profile"
											activeClassName="active"
										>
											<li>{activeUser?.firstname}</li>
										</NavLink>
										<NavLink
											exact
											to="/properties/myproperties"
											activeClassName="active"
										>
											<li>Your Properties</li>
										</NavLink>
										<a
											href="https://www.airbnb.com.ar/help"
											target="_blank"
											rel="noopener noreferrer"
										>
											<li>Help</li>
										</a>
										<button onClick={handleLogout}>
											<li>Logout</li>
										</button>
									</ul>
								) : (
									<ul className="navbar__subMenu" id="submenu">
										<NavLink
											exact
											to="/auth/register"
											activeClassName="active"
										>
											<li>Register</li>
										</NavLink>
										<NavLink
											exact
											to="/auth/login"
											activeClassName="active"
										>
											<li>Login</li>
										</NavLink>
										<a
											href="https://www.airbnb.com.ar/help"
											target="_blank"
											rel="noopener noreferrer"
										>
											<li>Help</li>
										</a>
									</ul>
								)}
							</li>
						</ul>
					</div>
				</div>
			</div>
		</nav>
	);
};
