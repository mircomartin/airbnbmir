import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

//Context
import { AuthContext } from '../../context/auth/AuthContext';

export const EditProfile = ({history}) => {

    const { activeUser, startCurrentProfile, startUpdateProfileInformation } = useContext(AuthContext)

    const [formValues, setFormValues] = useState({
        country: '',
        city: '',
        description: '',
        languajes: '',
    })

    const { country , city, description, languajes } = formValues

    const handleInputChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]:e.target.value,
        })
    }

    const { id } = useParams();

    useEffect(() => {
        if(!activeUser){
            startCurrentProfile(id)
        }
        // eslint-disable-next-line
    }, [id, activeUser])

    useEffect(() => {
        setFormValues(activeUser)
        // eslint-disable-next-line
    }, [activeUser])

    const handleSubmit = (e) => {
        e.preventDefault()

		startUpdateProfileInformation(id, formValues)

		setFormValues({
			country: '',
			city: '',
			description: '',
			languajes: '',
		})
		
        history.push('/profile')
    }

	return (
		<div className="container auth">
			<div className="row justify-content-center aling-items-center no-gutters">
				<div className="col-12 col-md-8 auth__wrapper">
					<div className="auth__wrapperTitle">
						<h2 className="auth__title">Edit</h2>
					</div>
					<div className="p-4">
						<form onSubmit={handleSubmit}>
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
									type="text"
									name="languajes"
									value={languajes || ''}
									onChange={handleInputChange}
									placeholder="Languages you can speak"
									className="auth__input"
								/>
							</div>
							<div className="form-values mb-4">
								<textarea
									name="description"
									value={description  || ''}
									onChange={handleInputChange}
									placeholder="Description"
									className="auth__input"
								/>
							</div>
							<div className="form-values mt-4">
								<button className="auth__button">Confirm</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};
