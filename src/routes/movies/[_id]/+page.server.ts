import clientPromise from '$lib/mongodb/mongodb.client';
import { ObjectId } from 'mongodb';

async function validateImgUrl(url: string): Promise<string | null> {
	try {
		const response = await fetch(url, { method: 'HEAD' });
		if (response.ok) {
			return url;
		} else {
			return '/default-movie.jpg';
		}
	} catch (error) {
		console.error('Failed to validate img url', error);
		return '/default-movie.jpg';
	}
}

export async function load({ params }) {
	const movieId = params._id;

	let client, movie;
	try {
		client = await clientPromise;
		const database = client?.db('sample_mflix');
		const collection = database?.collection('movies');
		movie = await collection?.findOne({ _id: new ObjectId(movieId) });

		if (movie) {
			movie = {
				...movie,
				_id: (movie._id as ObjectId).toString(),
				poster: await validateImgUrl(movie.poster)
			};
		}
	} catch (error) {
		console.error('Failed to retrieve movie data', error);
		if (client) {
			await client?.close();
		}
		return {
			status: 500,
			body: 'Failed to retrieve movie data'
		};
	}
	return {
		status: 200,
		body: movie
	};
}
