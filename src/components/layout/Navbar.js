import React, { useContext, useState } from 'react';

//Router
import { Link, NavLink, useHistory } from 'react-router-dom';

//Context
import { AuthContext } from '../../context/auth/AuthContext';

export const Navbar = () => {
	const { activeUser, startLogout } = useContext(AuthContext);

	const [search, setSearch] = useState({search: ''})

	const handleInputChange = e => {
		setSearch({
			...search,
			[e.target.name]:e.target.value
		})
	}

	const history = useHistory()
	
	const handleSubmit = (e) => {
		e.preventDefault()

		history.push(`/search/${search.search}`)
		
		setSearch({search: '',})
	}

	const handleLogout = () => {
		startLogout();
	};

	return (
		<nav className="navbar">
			<div className="container p-0 p-md-auto">
				<div className="row justify-content-center justify-content-md-between align-items-center w-100 no-gutters">
					<figure className="col-auto mb-2 mb-md-0">
						<Link to="/">
							<img
								src="/assets/img/logo.png"
								className="img-fluid navbar__img"
								alt="brand"
							/>
						</Link>
					</figure>
					{activeUser?.uid && (
						<div className="col-auto">
							<form onSubmit={handleSubmit}>
								<div className="navbar__wrapperInputs">
									<input
										className="navbar__input"
										type="search"
										name="search"
										value={search.search || ''}
										onChange={handleInputChange}
										placeholder="Search..."
									/>
									<button
										className="navbar__button"
									>
										<i className="fas fa-search"></i>
									</button>
								</div>
							</form>
						</div>
					)}

					<div className="col-auto ml-2 ml-md-0">
						<ul className="navbar__menuMain">
							<li>
								<span id="navbar" className="navbar__profile">
									<i className="fas fa-bars navbar__icono mr-0 mr-md-2"></i>
									{!activeUser?.img ? (
										<i className="fas fa-user-circle navbar__icono d-none d-md-block"></i>
									) : (
										<img
											src={activeUser.img}
											className="navbar__imgProfile d-none d-md-block"
											alt="Profile"
										/>
									)}
								</span>
								{activeUser?.uid ? (
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
										<NavLink
											exact
											to="/properties/addproperty"
											activeClassName="active"
										>
											<li>Add Property</li>
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
