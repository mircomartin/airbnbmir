import React, { useContext } from 'react';

//Validator
import validator from 'validator';

//Router
import { Link } from 'react-router-dom';

//Context
import { AuthContext } from '../../context/auth/AuthContext';

//Component
import { useForm } from '../../hooks/useForm';
import { UiContext } from '../../context/ui/UiContext';

export const RegisterScreen = () => {
	const { startRegisterEmailPassword } = useContext(AuthContext);
	const { alert, showAlert, hideAlert } = useContext(UiContext);

	const [formValues, handleInputChange] = useForm({
		name: 'Mirco',
		lastname: 'Martin',
		birth: '1987-10-26',
		email: 'mirco@carlos.com',
		password: '123456',
	});

	const { name, lastname, birth, email, password } = formValues;

	const isFormValid = () => {
		if (name.trim() === '' || lastname.trim() === '') {
			showAlert();
		} else if (birth.trim() === '' || !validator.isDate(birth)) {
			showAlert();
		} else if (!validator.isEmail(email)) {
			showAlert();
		} else if (password <= 5) {
			showAlert();
		} else {
			hideAlert();
			return true;
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (isFormValid()) {
			startRegisterEmailPassword(formValues)
		}
	};

	return (
		<div className="container auth">
			<div className="row justify-content-center aling-items-center no-gutters">
				<div className="col-12 col-md-8 auth__wrapper">
					<div className="auth__wrapperTitle">
						<h2 className="auth__title">Register</h2>
					</div>
					<div className="p-4">
						<form onSubmit={handleSubmit} noValidate>
							<div className="form-values auth__group mb-4">
								<input
									type="text"
									name="name"
									value={name}
									onChange={handleInputChange}
									placeholder="Name"
									className="auth__input"
								/>
								<input
									type="text"
									name="lastname"
									value={lastname}
									onChange={handleInputChange}
									placeholder="Last Name"
									className="auth__input"
								/>
								{alert ? (
									<p className="auth__message alert">
										<i className="fas fa-exclamation iconoError"></i>{' '}
										The name and lastname are obligatory.
									</p>
								) : (
									<p className="auth__message">
										You must be sure that your name will be the same
										of your ID.
									</p>
								)}
							</div>

							<div className="form-values mb-4">
								<input
									type="date"
									name="birth"
									value={birth}
									onChange={handleInputChange}
									placeholder="Date of birth"
									className="auth__input"
								/>
								{alert ? (
									<p className="auth__message alert">
										<i className="fas fa-exclamation iconoError"></i>{' '}
										Choice your date of birth to continue.
									</p>
								) : (
									<p className="auth__message">
										You must be at least 18 years old for you will can
										register. We won't share your date of birth with
										other user of Airbnb
									</p>
								)}
							</div>
							<div className="form-values mb-4">
								<input
									type="email"
									name="email"
									value={email}
									onChange={handleInputChange}
									placeholder="Email"
									className="auth__input"
								/>

								{alert ? (
									<p className="auth__message alert">
										<i className="fas fa-exclamation iconoError"></i>{' '}
										Ypu have to put a email.
									</p>
								) : (
									<p className="auth__message">
										We will send you all of confirmation of your trips
										and the recipes for email.
									</p>
								)}
							</div>
							<div className="form-values mb-4">
								<input
									type="password"
									name="password"
									value={password}
									onChange={handleInputChange}
									placeholder="Password"
									className="auth__input"
								/>

								{alert ? (
									<p className="auth__message alert">
										<i className="fas fa-exclamation iconoError"></i>{' '}
										The password have to be 6 or more characters.
									</p>
								) : (
									<p className="auth__message">
										When you click in Register, you are acepting the
										Terms and the Conditions of Airbnb.
									</p>
								)}
							</div>
							<div className="form-values mt-4">
								<button className="auth__button">Register</button>
							</div>
						</form>
						<Link className="auth__links my-4" to="/auth/login">
							Login
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};
