import React, { useContext } from 'react';

//Router
import { Link } from 'react-router-dom';

//Context
import { AuthContext } from '../../context/auth/AuthContext';

//Components
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {
	const { startLoginEmailPassword } = useContext(AuthContext)
    const [ formValues, handleInputChange ] = useForm({
        email: 'mirco@carlos.com',
        password: '123456',
    })

    const { email, password } = formValues;

    const handleSubmit = e => {
		e.preventDefault()
		startLoginEmailPassword(email, password)
    }

	return (
		<div className="container auth">
			<div className="row justify-content-center aling-items-center no-gutters">
				<div className="col-12 col-md-8 auth__wrapper">
					<div className="auth__wrapperTitle">
						<h2 className="auth__title">Login</h2>
					</div>
					<div className="p-4">
						<form onSubmit={handleSubmit}>
							<div className="form-values auth__group">
								<input
									type="email"
                                    name="email"
                                    value={email}
                                    onChange={handleInputChange}
									placeholder="Email"
									className="auth__input"
								/>
								<input
									type="password"
                                    name="password"
                                    value={password}
                                    onChange={handleInputChange}
									placeholder="Password"
									className="auth__input"
								/>
							</div>
							<div className="form-values mt-4">
								<button className="auth__button">Login</button>
							</div>
						</form>
						<Link to="/auth/register" className="auth__links my-4">
							¿Did you forget your password?
						</Link>
						<span>¿Don't you have an account?</span>
						<Link className="auth__links ml-2" to="/auth/register">Register</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
