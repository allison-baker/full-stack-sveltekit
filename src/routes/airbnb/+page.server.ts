import { ObjectId, Decimal128 } from 'mongodb';
import clientPromise from '$lib/mongodb/mongodb.client';

function convertDec128ToNum(doc: unknown): unknown {
	if (typeof doc === 'object' && doc !== null) {
		for (const key in doc as Record<string, unknown>) {
			const value = (doc as Record<string, unknown>)[key];
			if (value instanceof Decimal128) {
				(doc as Record<string, unknown>)[key] = value.toString();
			} else if (typeof value === 'object' && value !== null) {
				(doc as Record<string, unknown>)[key] = convertDec128ToNum(value);
			}
		}
	}
	return doc;
}

export async function load() {
	let airbnb;
	let client;

	try {
		client = await clientPromise;
		const database = client?.db('sample_airbnb');
		const collection = database?.collection('listingsAndReviews');

		const bnbsArr = await collection?.find().limit(10).toArray();

		const decimalConvertedDocs = bnbsArr?.map((doc) => convertDec128ToNum(doc));

		airbnb = decimalConvertedDocs?.map((listing) => {
			return {
				...(listing as Record<string, unknown>),
				_id: ((listing as Record<string, unknown>)._id as ObjectId).toString()
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

async function getUserID(username: string) {
	let client;
	try {
		client = await clientPromise;
		const collection = client?.db('dwdd-3780').collection('users');
		const user = await collection?.findOne({ name: username });
		if (!user) throw new Error('User not found');
		return user?._id;
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
}

async function getListingID(listingName: string) {
	let client;
	try {
		client = await clientPromise;
		const collection = client?.db('sample_airbnb').collection('listingsAndReviews');
		const user = await collection?.findOne({ name: listingName });
		if (!user) throw new Error('Listing not found');
		return user?._id;
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
}

async function addReview(username: string, rating: number, review: string, listingName: string) {
	if (username === '') throw new Error('Username is required');
	if (review === '') throw new Error('Review is required');
	if (listingName === '') throw new Error('Listing name is required');

	const userID = getUserID(username);
	const listingID = getListingID(listingName);
}

export const actions = {
	submitReview: async ({ request }) => {
		const data = await request.formData();
		console.log(data.get('username'));
		console.log(data.get('listingName'));
		console.log(data.get('ratingValue'));
		console.log(data.get('review'));
	}
};
