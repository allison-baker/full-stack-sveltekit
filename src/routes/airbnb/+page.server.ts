import { ObjectId, Decimal128 } from 'mongodb';
import clientPromise from '$lib/mongodb/mongodb.client';
import { fail } from '@sveltejs/kit';

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

async function getUserID(username: string): Promise<ObjectId> {
	let client;
	try {
		client = await clientPromise;
		const collection = client?.db('dwdd-3780-database').collection('users');
		const user = await collection?.findOne({ name: username });
		if (!user) throw new Error('User not found');
		return user?._id;
	} catch (error) {
		throw new Error('Failed to get user ID');
	}
}

async function getListingID(listingName: string): Promise<ObjectId> {
	let client;
	try {
		client = await clientPromise;
		const collection = client?.db('sample_airbnb').collection('listingsAndReviews');
		const listing = await collection?.findOne({ name: listingName });
		if (!listing) throw new Error('Listing not found');
		return listing?._id;
	} catch (error) {
		throw new Error('Failed to get user ID');
	}
}

async function addReview(username: string, rating: number, review: string, listingName: string) {
	if (username === '') throw new Error('Must be signed in to leave a review.');
	if (review === '') throw new Error('Review comment is required.');
	if (listingName === '') throw new Error('Please select a listing before submitting a review.');

	const userID = await getUserID(username);
	const listingID = await getListingID(listingName);

	const client = await clientPromise;
	try {
		const collection = client?.db('sample_airbnb').collection('listingsAndReviews');
		await collection?.updateOne({ _id: listingID }, {
			$push: {
				reviews: {
					_id: new ObjectId().toString(),
					date: new Date(),
					reviewer_id: userID.toString(),
					listing_id: listingID.toString(),
					reviewer_name: username,
					comments: review
				}
			}
		})
	} catch (error) {
		throw new Error('Failed to add review to airbnb listing');
	}

	try {
		const collection = client?.db('dwdd-3780-database').collection('users');
		await collection?.updateOne({ _id: userID }, {
			$push: {
				reviews: {
					_id: new ObjectId(),
					date: new Date(),
					listing_id: listingID,
					listing_name: listingName,
					comments: review,
					rating,
				}
			}
		})
	} catch (error) {
		throw new Error('Failed to add review to user file')
	}
}

export const actions = {
	submitReview: async ({ request }) => {
		const data = await request.formData();
		const username = data.get('username') as string;
		const rating = data.get('ratingValue');
		const listingName = data.get('listingName') as string;
		const review = data.get('review') as string;

		try {
			addReview(username, Number(rating), review, listingName);
			return {
				status: 200,
				body: {
					message: 'Review added successfully'
				}
			};
		} catch (error) {
			if (error instanceof Error) {
				return fail(422, { error: error.message });
			}
		}
	}
};
