import { ObjectId } from 'mongodb';
import clientPromise from '$lib/mongodb/mongodb.client';
import { redirect } from '@sveltejs/kit';

export async function load(event) {
	const session = await event.locals.auth();
	if (!session?.user) {
		throw redirect(303, '/');
	}

	let movies;
	let client;
	try {
		client = await clientPromise;
		const database = client?.db('sample_mflix');
		const collection = database?.collection('movies');

		const moviesArr = await collection
			?.find({
				$and: [{ year: 1985 }, { $or: [{ rated: 'PG' }, { rated: 'PG-13' }, { rated: 'R' }] }]
			})
			.toArray();
		movies = moviesArr?.map((movie) => {
			return { ...movie, _id: (movie._id as ObjectId).toString() };
		});
	} catch (error) {
		console.error('Failed to connect to MongoDB', error);
		if (client) {
			await client?.close();
		}
		return {
			status: 500,
			body: 'Failed to connect to MongoDB'
		};
	}
	return {
		status: 200,
		body: movies
	};
}
