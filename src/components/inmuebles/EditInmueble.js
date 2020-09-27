import React, { useState, useContext, useEffect } from 'react';

//Router
import { useParams } from 'react-router-dom';

//Context
import { InmueblesContext } from '../../context/inmuebles/InmueblesContext';

export const EditInmueble = ({history}) => {

    const { active, startActiveProperty, startUpdateProperty } = useContext(InmueblesContext)

    const [formValues, setFormValues] = useState({
        city: '', 
        title: '', 
        price: '', 
        country: '', 
        address:'',
        description: '',
    })

    const { city, title, price, country, address, description } = formValues

    const handleInputChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]:e.target.value
        })
    }

    const handleFileChange = (e) => {
		const file = e.target.files[0];

		if (file) {
			formValues.file = file;
		}
    };
    
    const {id} = useParams()

    useEffect(() => {
        startActiveProperty(id)
    }, [id])

    useEffect(() => {
        setFormValues(active)
    }, [active])

    const handleSubmit = (e) => {
        e.preventDefault()
        
        //Si todo esta OK
        startUpdateProperty(id, formValues)

        history.push('/properties/myproperties')
    }

	return (
		<div className="container auth">
			<div className="row justify-content-center aling-items-center no-gutters">
				<div className="col-12 col-md-8 auth__wrapper">
					<div className="auth__wrapperTitle">
						<h2 className="auth__title">Edit:</h2>
					</div>
					<div className="p-4">
						<form onSubmit={handleSubmit}>
							<div className="form-values mb-4">
								<input
									type="text"
									name="title"
									value={title || ''}
									onChange={handleInputChange}
									placeholder="Title"
									className="auth__input"
								/>
							</div>
							<div className="form-values mb-4">
								<input
									type="text"
									name="address"
									value={address || ''}
									onChange={handleInputChange}
									placeholder="Address"
									className="auth__input"
								/>
							</div>
							<div className="form-values mb-4">
								<input
									type="text"
									name="country"
									value={country || ''}
									onChange={handleInputChange}
									placeholder="Country"
									className="auth__input"
								/>
							</div>
							<div className="form-values mb-4">
								<input
									type="text"
									name="city"
									value={city || ''}
									onChange={handleInputChange}
									placeholder="City"
									className="auth__input"
								/>
							</div>
							<div className="form-values mb-4">
								<input
									type="number"
									name="price"
									value={price || ''}
									onChange={handleInputChange}
									placeholder="Price per night"
									className="auth__input"
								/>
							</div>
							<div className="form-values mb-4">
								<textarea
									name="description"
									value={description || ''}
									onChange={handleInputChange}
									placeholder="Description"
									className="auth__input"
								/>
							</div>
							<div className="form-values mb-4">
								<input
									type="file"
									name="file"
									placeholder="Description"
									className="auth__input"
									onChange={handleFileChange}
								/>
							</div>

							<div className="form-values mt-4">
								<button className="auth__button">Confirm</button>
							</div>
                            <div className="form-values mt-4">
								<button className="auth__button">Delete</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
