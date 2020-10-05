import React, { useContext, useEffect, useState } from 'react';

//Router
import { useParams } from 'react-router-dom';

//Sweet Alert 2
import Swal from 'sweetalert2';

//Context
import { AuthContext } from '../../context/auth/AuthContext';
import { InmueblesContext } from '../../context/inmuebles/InmueblesContext';
import { UiContext } from '../../context/ui/UiContext';

//Components
import { Spinner } from '../layout/Spinner';

export const SingleInmuebleScreen = () => {
	const { loading } = useContext(UiContext);
	const { activeUser } = useContext(AuthContext);
	const {
		active,
		startActiveProperty,
		startAddComment,
		startLikeProperty,
	} = useContext(InmueblesContext);

	let uidVoted;

	if (activeUser?.uid) {
		uidVoted = activeUser.uid;
	}

	const [comment, setComment] = useState({
		message: '',
	});

	const { message } = comment;

	const { id } = useParams();

	const {
		file,
		price,
		address,
		title,
		city,
		country,
		description,
		user,
		comments,
		likes,
		votado,
	} = active;

	useEffect(() => {
		startActiveProperty(id);
		// eslint-disable-next-line
	}, [id]);

	const handleInputChange = (e) => {
		setComment({
			...comment,
			[e.target.name]: e.target.value,
		});
	};

	const handleLike = () => {

		const voted = votado.filter ((vote)=> vote.uid === uidVoted)

		if(voted.length === 0) {

			const newTotal = likes + 1;
	
			const listVoted = { uid: uidVoted, id: Math.random() };
	
			startLikeProperty(id, { likes: newTotal, votado: [...votado, listVoted] });
	
			startActiveProperty(id);

		}else{

			Swal.fire('Warning', ' You have already voted this property', 'warning')

		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		comment.userName = activeUser.firstname;
		comment.uid = user.uid;
		comment.id = Math.random();

		const newComment = [...comments, comment];

		startAddComment(id, { comments: newComment });

		setComment({
			message: '',
		});

		startActiveProperty(id);
	};

	if (loading) return <Spinner />;

	return (
		<div className="container single">
			<div className="row">
				<div className="col-12 mb-5">
					<h1 className="single__title">{title}</h1>
					<p className="single__subtitle">
						{city}, {country}
					</p>
					<figure className="text-center">
						{file ? (
							<img
								src={file}
								className="single__img img-fluid"
								alt={title}
							/>
						) : (
							<img
								src="/assets/img/sinimagen.png"
								className="single__img img-fluid"
								alt="Property"
							/>
						)}
					</figure>
				</div>
				<div className="col-12">
					<h2 className="single__address">{address}</h2>
					<p className="single__description">
						<i className="fas fa-home"></i>
						{description}
					</p>
					<div className="d-flex align-items-center justify-content-between">
						<p className="single__price">
							<span>${price} </span>/night
						</p>
						<p className="inmuebles__bodyIcono" onClick={handleLike}>
							<i className="far fa-thumbs-up"></i>
							<span>{likes}</span>
						</p>
					</div>
					<h3 className="single__contact">Contact</h3>
					<p className="single__contactDetails">
						<i className="fas fa-at"></i> {user?.email}
					</p>
				</div>
			</div>
			<div className="row comments">
				<div className="col-12">
					<h3 className="comments__title">Comments</h3>
				</div>
				<div className="col-12">
					<form onSubmit={handleSubmit}>
						<textarea
							className="comments__textarea"
							name="message"
							value={message}
							onChange={handleInputChange}
						/>
						<button className="comments__button">Add</button>
					</form>
				</div>
				{comments?.length === 0 ? (
					<div className="col-12 comments__commentWrapper">
						<p className="comments__noComments">No Comments</p>
					</div>
				) : (
					comments?.map((comment) => (
						<div
							className="col-12 col-md-6 comments__commentWrapper"
							key={comment.id}
						>
							<h3 className="comments__titleUser">{comment.userName}</h3>
							<p className="comments__message">{comment.message}</p>
						</div>
					))
				)}
			</div>
		</div>
	);
};
