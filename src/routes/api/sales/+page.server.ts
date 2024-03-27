import { ObjectId } from 'mongodb';
import clientPromise from '$lib/mongodb/mongodb.client';

export async function GET() {
	let sales;
	let client;
	try {
		client = await clientPromise;
		const database = client?.db('sample_supplies');
		const collection = database?.collection('sales');

		const salesArr = await collection?.find().toArray();

		sales = salesArr?.map((sale) => {
			return { ...sale, _id: (sale._id as ObjectId).toString() };
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
	return new Response(JSON.stringify(sales), { status: 200 });
}

export async function POST({ request }) {
	const reqBody = await request.json();
	console.log(reqBody);

	let client;
	try {
		client = await clientPromise;
		const database = client?.db('sample_supplies');
		const collection = database?.collection('stats');
		collection?.insertMany(reqBody);
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

	return new Response(JSON.stringify('Success!'), { status: 200 });
}
