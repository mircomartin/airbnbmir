import { db } from './../firebase/firebase-config';

export const loadInmueblesAll = async () => {
	const inmueblesSnap = await db.collection('Properties').get();

	const inmuebles = [];

	inmueblesSnap.forEach((snapHijo) => {
		inmuebles.push({
			id: snapHijo.id,
			...snapHijo.data(),
		});
	});

	return inmuebles;
};

export const loadPropertySearch = async (keyword) => {
	
	const inmueblesSnap = await db
	.collection('Properties')
	.where('keywords', 'array-contains',keyword)
	.get();
	
	const inmuebles = [];
	
	inmueblesSnap.forEach((snapHijo) => {
		inmuebles.push({
			id: snapHijo.id,
			...snapHijo.data(),
		});
	});

	return inmuebles;
};

export const loadInmuebleActive = async (id) => {
	const inmueble = await db.collection('Properties').doc(id).get();

	const queryResp = inmueble.data();
	
	const newInmueble = {
		id: queryResp.id,
		...queryResp,
	};
	return newInmueble;
};

export const loadMyProperties = async (uid) => {
	const inmueblesSnap = await db.collection('Properties').where("user.uid", "==", uid).get();
	
	const inmuebles = [];

	inmueblesSnap.forEach((snapHijo) => {
		inmuebles.push({
			id: snapHijo.id,
			...snapHijo.data(),
		});
	});

	return inmuebles;
};
