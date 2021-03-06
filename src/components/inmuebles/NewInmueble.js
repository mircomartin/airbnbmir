import React, { useContext } from 'react';

//Context
import { AuthContext } from '../../context/auth/AuthContext';
import { InmueblesContext } from '../../context/inmuebles/InmueblesContext';
import { UiContext } from '../../context/ui/UiContext';

//Components
import { useForm } from '../../hooks/useForm';

const NewInmueble = ({ history }) => {
	const { user } = useContext(AuthContext);
	const { startAddProperty } = useContext(InmueblesContext);
	const { alert, showAlert, hideAlert } = useContext(UiContext);

	const [formValues, handleInputChange, reset] = useForm({
		title: '',
		address: '',
		country: '',
		city: '',
		price: '',
		description: '',
	});

	const { title, address, country, city, price, description } = formValues;

	const handleFileChange = (e) => {
		const file = e.target.files[0];

		if (file) {
			formValues.file = file;
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (
			title.trim() === '' ||
			address.trim() === '' ||
			country.trim() === '' ||
			city.trim() === '' ||
			price.trim() === '' ||
			description.trim() === ''
		) {
			showAlert();
			return false
		}

		hideAlert();

		startAddProperty(user, formValues);
		
		setTimeout(() => {
			history.push('/properties/myproperties');			
		}, 3000);

		reset();
	};

	return (
		<div className="container auth">
			<div className="row justify-content-center aling-items-center no-gutters">
				<div className="col-12 col-md-8 auth__wrapper">
					<div className="auth__wrapperTitle">
						<h2 className="auth__title">Add:</h2>
					</div>
					<div className="p-4">
						<form onSubmit={handleSubmit}>
							<div className="form-values mb-4">
								<input
									type="text"
									name="title"
									value={title}
									onChange={handleInputChange}
									placeholder="Title"
									className="auth__input"
								/>
							</div>
							<div className="form-values mb-4">
								<input
									type="text"
									name="address"
									value={address}
									onChange={handleInputChange}
									placeholder="Address"
									className="auth__input"
								/>
							</div>
							<div className="form-values mb-4">
								<input
									type="text"
									name="country"
									value={country}
									onChange={handleInputChange}
									placeholder="Country"
									className="auth__input"
								/>
							</div>
							<div className="form-values mb-4">
								<input
									type="text"
									name="city"
									value={city}
									onChange={handleInputChange}
									placeholder="City"
									className="auth__input"
								/>
							</div>
							<div className="form-values mb-4">
								<input
									type="number"
									name="price"
									value={price}
									onChange={handleInputChange}
									placeholder="Price per night"
									className="auth__input"
								/>
							</div>
							<div className="form-values mb-4">
								<textarea
									name="description"
									value={description}
									onChange={handleInputChange}
									placeholder="Description"
									className="auth__input"
								/>
							</div>
							<div className="form-values mb-4">
								<input
									type="file"
									name="file"
									className="auth__input"
									onChange={handleFileChange}
								/>
							</div>
							{alert && (
								<p className="auth__message alert">
									All the fields are obligatory
								</p>
							)}
							<div className="form-values mt-4">
								<button className="auth__button">Add</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default NewInmueble;
