import React, { useContext } from 'react';

//Context
import { AuthContext } from '../../context/auth/AuthContext';

export const ProfileSreen = ({history}) => {
	const { activeUser, startUpdateProfileImage } = useContext(AuthContext);

	const handleFileChange = (e) => {
		const file = e.target.files[0];

		if (file) {
			activeUser.img = file;
			startUpdateProfileImage(activeUser.img, activeUser.uid);
		}
    };
    
    const handleEdit = (activeUser) => {
        history.push(`profile/${activeUser.uid}`)
    }

	return (
		<div className="container profile">
			<div className="row no-gutters align-items-center">
				<div className="col-12 col-md-4 profile__wrapper">
					<div className="profile__superior">
						<figure className="text-center">
							{!activeUser?.img ? (
								<img
									src="/assets/img/sinimagen.png"
									className="img-fluid profile__img"
									alt="Profile"
								/>
							) : (
								<img
									src={activeUser?.img}
									className="img-fluid profile__img"
									alt="Profile"
								/>
							)}
						</figure>
						<form className="mt-2">
							<label className="profile__labelphoto" htmlFor="file">
								Update your photo
							</label>
							<input
								type="file"
								name="file"
								id="file"
								onChange={handleFileChange}
							/>
						</form>
						<p className="profile__parrafo">
							<i className="fas fa-user-check profile__icono"></i>Verified
							identity
						</p>
					</div>
					<div className="d-none d-md-block profile__inferior">
						<h3 className="profile__confirmed">
							{activeUser?.firstname} confirmed
						</h3>
						<p>
							<i className="fas fa-check mr-2"></i> Identity
						</p>
						<p>
							<i className="fas fa-check mr-2"></i> Email
						</p>
						<p>
							<i className="fas fa-check mr-2"></i> Address
						</p>
					</div>
				</div>
				<div className="col-12 col-md-8 px-5">
					<div className="profile__derechaWrapper">
						<h1 className="profile__name">
							¡Hi! I'm {activeUser?.firstname}
						</h1>
						<span onClick={() => handleEdit(activeUser)} className="profile__editspan">
							Profile edit
						</span>
					</div>
					<div className="profile__derechaWrapper">
						<h2 className="profile__information">Information</h2>
						<p className="profile__details">
							{activeUser?.description}
						</p>
						<p className="profile__details">
							<i className="fas fa-home mr-2"></i> Live in {activeUser?.city}, {activeUser?.country}
                        </p>
						<p className="profile__details">
							<i className="fas fa-comment mr-2"></i> Speak {activeUser?.languajes}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};
