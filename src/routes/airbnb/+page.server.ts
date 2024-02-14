import { ObjectId } from 'mongodb';
import clientPromise from '$lib/mongodb/mongodb.client';

export async function load() {
	let airbnb;
	let client;

	try {
		client = await clientPromise;
		const database = client?.db('sample_airbnb');
		const collection = database?.collection('listingsAndReview');

		const bnbsArr = await collection?.find().limit(10).toArray();

		airbnb = bnbsArr?.map((listing) => {
			return {
				...listing,
				_id: (listing._id as ObjectId).toString()
			};
		});
	} catch (error) {
		console.error('Failed to connect to MongoDB', error);
		if (client) {
			await client.close();
		}
		return {
			status: 500,
			body: 'Failed to connect to MongoDB'
		};
	}
	return {
		status: 200,
		body: airbnb
	};
}
