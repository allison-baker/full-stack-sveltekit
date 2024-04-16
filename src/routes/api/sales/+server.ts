import { ObjectId } from 'mongodb';
import clientPromise from '$lib/mongodb/mongodb.client';

export async function GET({ url }) {
	const itemName = url.searchParams.get('itemName');
	const coupon = url.searchParams.get('coupon');
	const age = url.searchParams.get('age');
	const satisfaction = url.searchParams.get('satisfaction');
	const gender = url.searchParams.get('gender');

	let sales;
	let client;
	try {
		client = await clientPromise;
		const database = client?.db('sample_supplies');
		const collection = database?.collection('sales');

		let salesArr = await collection?.find().toArray();

		if (itemName) {
			salesArr = salesArr?.filter((sale) =>
				sale.items.find((item: { name: string }) => item.name === itemName)
			);
		}
		if (coupon) {
			salesArr = salesArr?.filter((sale) => String(sale.couponUsed) === coupon);
		}
		if (age) {
			salesArr = salesArr?.filter((sale) => String(sale.customer.age) === age);
		}
		if (satisfaction) {
			salesArr = salesArr?.filter((sale) => String(sale.customer.satisfaction) === satisfaction);
		}
		if (gender) {
			salesArr = salesArr?.filter((sale) => sale.customer.gender === gender);
		}

		sales = salesArr?.map((sale) => {
			return { ...sale, _id: (sale._id as ObjectId).toString() };
		});
	} catch (error) {
		console.error('Failed to connect to MongoDB', error);
		if (client) {
			await client?.close();
		}
		return new Response(JSON.stringify('Failed to connect to MongoDB'), { status: 500 });
	}
	return new Response(JSON.stringify(sales), { status: 200 });
}

export async function POST({ request }) {
	const reqBody = await request.json();

	let client;
	try {
		client = await clientPromise;
		const database = client?.db('sample_supplies');
		const collection = database?.collection('stats');
		collection?.insertOne(reqBody);
	} catch (error) {
		console.error('Failed to connect to MongoDB', error);
		if (client) {
			await client?.close();
		}
		return new Response(JSON.stringify('Failed to connect to MongoDB'), { status: 500 });
	}

	return new Response(JSON.stringify('Success!'), { status: 200 });
}
